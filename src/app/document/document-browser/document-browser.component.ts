import { Component, OnInit, HostListener, Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { Angular2TokenService } from 'angular2-token';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

export class DynamicFlatNode {
  constructor(public id: number,
              public name: string,
              public level = 0,
              public expandable = false,
              public isLoading = false) {}

  get path(): string {
    return `folder/${this.id}`;
  }
}

@Injectable()
export class DynamicDatabase {
  constructor (private tokenService: Angular2TokenService, private route: ActivatedRoute) {

  }

  initialData() {
    var accountIdentifier = this.route.snapshot.parent.params.account;

    return this.tokenService.get(`/${accountIdentifier}/folders?root=true`);
  }

  getChildren(node) {
    var accountIdentifier = this.route.snapshot.parent.params.account;

    return this.tokenService.get(`/${accountIdentifier}/folders/${node.id}/folders`);
  }

  isExpandable(node): boolean {
    return false;
  }
}

@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const index = this.data.indexOf(node);

    if (index < 0) {
      return;
    }

    if (expand) {
      this.database.getChildren(node).subscribe(res => {
        let children = res.json().data.map(folder => new DynamicFlatNode(folder.id, folder.attributes.name, node.level + 1));

        // Insert children into folder list
        this.data.splice(index + 1, 0, ...children);
        this.dataChange.next(this.data);
      });
    } else {
      let count = 0;

      // Get range of elements to remove from tree
      for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++, count++) {}
      // Remove
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
      node.isLoading = false;
    }
  }
}

@Component({
  selector: 'app-document-browser',
  templateUrl: './document-browser.component.html',
  styleUrls: ['./document-browser.component.scss'],
  providers: [DynamicDatabase]
})
export class DocumentBrowserComponent implements OnInit {

  resizing = false;
  // Screen x position when resizing started
  resizingAnchor = -1;
  // Width we started resizing at
  resizingFrom = 300;
  drawerWidth = 300;

  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    database.initialData().subscribe(res => {
      this.dataSource.data = res.json().data.map(folder => new DynamicFlatNode(folder.id, folder.attributes.name));
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit() {
  }

  onGrabberMouseDown(e) {
    this.resizing = true;
    this.resizingAnchor = e.screenX;
    this.resizingFrom = this.drawerWidth;
    e.preventDefault();
  }

  @HostListener('document:mouseup', [ '$event' ])
  onMouseUp(e) {
    this.resizing = false;
  }

  @HostListener('document:mousemove', [ '$event' ])
  onMouseMove(e) {
    if (this.resizing) {
      const dx = e.screenX - this.resizingAnchor;
      const width = this.resizingFrom + dx;

      // Clamp
      this.drawerWidth = Math.max(100, width);
    }
  }

}

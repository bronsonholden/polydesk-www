import { Component, OnInit, HostListener } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

export class DocumentElement {
  name: string;
}

export class FolderElement {
  name: string;
  type?: string;
  children?: FolderElement[];
}

@Component({
  selector: 'app-document-browser',
  templateUrl: './document-browser.component.html',
  styleUrls: ['./document-browser.component.scss']
})
export class DocumentBrowserComponent implements OnInit {

  resizing: boolean = false;
  // Screen x position when resizing started
  resizingAnchor: number = -1;
  // Width we started resizing at
  resizingFrom: number = 300;
  drawerWidth: number = 300;

  documentList = new MatTableDataSource<DocumentElement>();
  selection = new SelectionModel<DocumentElement>(true, []);

  folderList: FolderElement[] = [
    {
      name: 'Test 1',
      children: new Array<FolderElement>()
    },
    {
      name: 'Test 2',
      children: [
        {
          name: 'Test 3',
          children: new Array<FolderElement>()
        },
        {
          name: 'Test Doc.pdf',
          type: 'pdf'
        }
      ]
    }
  ];

  nestedTreeControl: NestedTreeControl<FolderElement>;
  nestedDataSource: MatTreeNestedDataSource<FolderElement>;

  displayedColumns = [
    'select',
    'name'
  ];

  constructor() {
    for (var i = 0; i < 100; ++i) {
      this.documentList.data.push({ name: `Document #${i + 1}.pdf` });
    }

    this.nestedTreeControl = new NestedTreeControl<FolderElement>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedDataSource.data = this.folderList;
  }

  ngOnInit() {
  }

  /* Check if all rows in the document list are selected */
  isAllSelected() {
    return this.selection.selected.length === this.documentList.data.length;
  }

  selectAll() {
    this.documentList.data.forEach(row => this.selection.select(row));
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selectAll();
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
      let dx = e.screenX - this.resizingAnchor;
      let width = this.resizingFrom + dx;

      // Clamp
      this.drawerWidth = Math.min(Math.max(300, width), 800);
    }
  }

  hasNestedChild = (_: number, element: FolderElement) => {
    return !element.type
  }

  private _getChildren = (element: FolderElement) => element.children;

}

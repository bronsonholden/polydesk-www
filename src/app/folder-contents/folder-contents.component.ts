import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel, CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { Angular2TokenService } from 'angular2-token';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs/operators';

export class ContentElement {
  constructor(public id: number, public name: string, public type: string) { }

  get path(): string {
    if (this.type === 'folder') {
      return `${this.type}/${this.id}`;
    } else if (this.type === 'document') {
      return `${this.id}`;
    }
  }
}

@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.scss']
})
export class FolderContentsComponent implements OnInit {

  data: ContentElement[] = [];
  documentList: MatTableDataSource<ContentElement>;
  selection = new SelectionModel<ContentElement>(true, []);

  displayedColumns = [
    'select',
    'icon',
    'name'
  ];

  constructor(private tokenService: Angular2TokenService, private route: ActivatedRoute) { }

  pathFor(doc) {
    if (this.route.snapshot.params.folder) {
      return `../../${doc.path}`;
    } else {
      return doc.path;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data = [];

      let accountIdentifier = this.route.snapshot.parent.parent.params.account;
      let folderId = this.route.snapshot.params.folder;
      let path;

      if (folderId) {
        path = `/${accountIdentifier}/folders/${folderId}/folders`;
      } else {
        path = `/${accountIdentifier}/folders?root=true`;
      }

      let source = this.tokenService.get(path).pipe(concat(this.tokenService.get(`/${accountIdentifier}/documents`)));

      source.subscribe(res => {
        console.log(res.json());
        this.data = this.data.concat(res.json().data.map(element => new ContentElement(element.id, element.attributes.name, element.type)));
        this.documentList = new MatTableDataSource<ContentElement>(this.data);
      });
    });
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

}

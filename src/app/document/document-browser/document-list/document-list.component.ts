import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel, CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { Angular2TokenService } from 'angular2-token';
import { ActivatedRoute } from '@angular/router';

export class DocumentElement {
  constructor(public id: number, public name: string, public type: string) { }

  get path(): string {
    return `${this.type}/${this.id}`;
  }
}

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  data: DocumentElement[] = [];
  documentList: MatTableDataSource<DocumentElement>;
  selection = new SelectionModel<DocumentElement>(true, []);

  displayedColumns = [
    'select',
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
      let accountIdentifier = this.route.snapshot.parent.parent.params.account;
      let folderId = this.route.snapshot.params.folder;
      let path;

      if (folderId) {
        path = `/${accountIdentifier}/folders/${folderId}/folders`;
      } else {
        path = `/${accountIdentifier}/folders?root=true`;
      }

      this.tokenService.get(path).subscribe(res => {
        this.data = res.json().data.map(folder => new DocumentElement(folder.id, folder.attributes.name, 'folder'));
        this.documentList = new MatTableDataSource<DocumentElement>(this.data);
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

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel, CollectionViewer, SelectionChange } from '@angular/cdk/collections';

export class DocumentElement {
  id: number;
  name: string;
}

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

  documentList = new MatTableDataSource<DocumentElement>();
  selection = new SelectionModel<DocumentElement>(true, []);

  displayedColumns = [
    'select',
    'name'
  ];

  constructor() { }

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

}

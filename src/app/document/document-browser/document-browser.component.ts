import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

export interface DocumentElement {
  name: string;
}

@Component({
  selector: 'app-document-browser',
  templateUrl: './document-browser.component.html',
  styleUrls: ['./document-browser.component.scss']
})
export class DocumentBrowserComponent implements OnInit {

  documentList = new MatTableDataSource<DocumentElement>();
  selection = new SelectionModel<DocumentElement>(true, []);

  displayedColumns = [
    'select',
    'name'
  ];

  constructor() {
    for (var i = 0; i < 100; ++i) {
      this.documentList.data.push({ name: `Document #${i + 1}.pdf` });
    }
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

}

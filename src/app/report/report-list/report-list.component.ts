import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

export class ReportElement {
  name: string;
}

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reportList = new MatTableDataSource<ReportElement>();
  selection = new SelectionModel<ReportElement>(true, []);

  displayedColumns = [
    'select',
    'name'
  ];

  constructor() {
    for (var i = 0; i < 100; ++i) {
      this.reportList.data.push({ name: `Report #${i + 1}` });
    }
  }

  ngOnInit() {
  }

  /* Check if all rows in the document list are selected */
  isAllSelected() {
    return this.selection.selected.length === this.reportList.data.length;
  }

  selectAll() {
    this.reportList.data.forEach(row => this.selection.select(row));
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selectAll();
  }

}

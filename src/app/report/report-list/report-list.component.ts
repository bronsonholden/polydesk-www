import { Component, OnInit, HostListener } from '@angular/core';
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

  resizingColumn = null;
  resizing = false;
  // Screen x position when resizing started
  resizingAnchor = -1;
  // Width we started resizing at
  resizingFrom = 300;

  displayedColumns = [
    'select',
    'name',
    'createdOn',
    'createdBy',
    'schedules'
  ];

  columnWidths = {
    name: 100,
    createdOn: 100,
    createdBy: 100,
    schedules: 100
  }

  constructor() {
    for (let i = 0; i < 100; ++i) {
      this.reportList.data.push({
        name: `Report #${i + 1}`,
        createdOn: '1/1/2000 08:00 PM -08:00',
        createdBy: 'John Doe',
        schedules: [
          {
            name: 'Example schedule'
          },
          {
            name: 'Another schedule'
          }
        ]
      });
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

  onGrabberMouseDown(e, columnName) {
    this.resizingColumn = columnName;
    this.resizing = true;
    this.resizingAnchor = e.screenX;
    this.resizingFrom = this.columnWidths[columnName];
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
      const columnIndex = this.displayedColumns.indexOf(this.resizingColumn);

      this.columnWidths[this.resizingColumn] = Math.max(100, width);
    }
  }

}

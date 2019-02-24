import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

export class ReportElement {
  name: string;
  createdOn: string;
  createdBy: string;
  schedules: any[];
}

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  @ViewChild('reportListContainer') reportListContainer: ElementRef;
  @ViewChild('hiddenScrollable') hiddenScrollable: ElementRef;

  reportList = new MatTableDataSource<ReportElement>();
  selection = new SelectionModel<ReportElement>(true, []);

  displayedColumns = [
    'select',
    'name',
    'createdOn',
    'createdBy',
    'schedules'
  ];

  columnWidths = {
    name: 0,
    createdOn: 200,
    createdBy: 150,
    schedules: 100
  };

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
    let el = this.reportListContainer.nativeElement;
    let scrollbarEl = this.hiddenScrollable.nativeElement;
    // Scrollbar width
    let scrollbarWidth = (scrollbarEl.offsetWidth - scrollbarEl.clientWidth);
    // Total available width (minus select column which is 56px)
    let width = el.offsetWidth - 56 - scrollbarWidth;
    // Number of columns
    let columns = 0;
    // Portion of available width explicitly portioned to columns
    let occupied = 0;
    // Number of filler columns
    let fillers = 0;

    for (let col in this.columnWidths) {
      columns += 1;

      let w = this.columnWidths[col];

      if (w > 0) {
        occupied += Math.max(100, w);
      } else {
        fillers += 1;
      }
    }

    // If we can't fit all available columns, just portion evenly
    if (occupied > width || (occupied === width && fillers > 0)) {
      let assignedWidth = Math.floor(width / columns);

      for (let col in this.columnWidths) {
        this.columnWidths[col] = assignedWidth;
      }

      // Add remaining width to first column
      let first = Object.keys(this.columnWidths)[0];

      this.columnWidths[first] += width - (assignedWidth * columns);

      console.log(this.columnWidths);
    } else if (fillers > 0) {
      let fillerWidth = Math.floor((width - occupied) / fillers);
      let firstFiller;

      for (let col in this.columnWidths) {
        if (this.columnWidths[col] === 0) {
          if (!firstFiller) {
            firstFiller = col;
          }

          this.columnWidths[col] = fillerWidth;
        }
      }

      // Add remaining width to first filler
      this.columnWidths[firstFiller] += width - occupied - (fillerWidth * fillers);
    }
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

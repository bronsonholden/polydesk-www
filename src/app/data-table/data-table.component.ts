import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AngularTokenService } from 'angular-token';


export class DataTableElement {
  constructor(public data: any) { }
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild('dataTableContainer') dataTableContainer: ElementRef;
  @ViewChild('hiddenScrollable') hiddenScrollable: ElementRef;
  @Input() data: any;

  dataTableElements: MatTableDataSource<DataTableElement>;
  selection = new SelectionModel<DataTableElement>(true, []);
  displayedColumns: string[] = [];

  getHeader(column) {
    return this.data.columns[column.name].title;
  }

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private tokenService: AngularTokenService) {
  }

  ngOnInit() {
    this.displayedColumns = this.data.display.map(column => column.name);

    if (this.data.selectable) {
      this.displayedColumns.unshift('select');
    }

    this.http.get(`${this.tokenService.tokenOptions.apiBase}/test/${this.data.resource}`).subscribe((json: any) => {
      this.dataTableElements = new MatTableDataSource<DataTableElement>(json.data.map(element => new DataTableElement(element)));
    }, (json: any) => {
      json.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });

    this.setUpColumnSizes()
  }

  setUpColumnSizes() {
    let el = this.dataTableContainer.nativeElement;
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

    for (let col of this.data.display) {
      columns += 1;

      let w = col.width || 0;

      if (w > 0) {
        occupied += Math.max(100, w);
      } else {
        fillers += 1;
      }
    }

    // If we can't fit all available columns, just portion evenly
    if (occupied > width || (occupied === width && fillers > 0)) {
      let assignedWidth = Math.floor(width / columns);

      for (let col of this.data.display) {
        col.width = assignedWidth;
      }

      // Add remaining width to first column
      let first = this.data.display[0];

      first.width += width - (assignedWidth * columns);
    } else if (fillers > 0) {
      let fillerWidth = Math.floor((width - occupied) / fillers);
      let firstFiller;

      for (let col of this.data.display) {
        if ((col.width || 0) === 0) {
          if (!firstFiller) {
            firstFiller = col;
          }

          col.width = fillerWidth;
        }
      }

      // Add remaining width to first filler
      firstFiller.width += width - occupied - (fillerWidth * fillers);
    }
  }

  /* Check if all rows in the document list are selected */
  isAllSelected() {
    return this.selection.selected.length === this.dataTableElements.data.length;
  }

  selectAll() {
    this.dataTableElements.data.forEach(row => this.selection.select(row));
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selectAll();
  }

}

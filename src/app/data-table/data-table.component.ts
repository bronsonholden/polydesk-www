import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AngularTokenService } from 'angular-token';
import { DatatableComponent as NgxDatatableComponent, SortType } from '@swimlane/ngx-datatable';

import { get, isArray, isEqual, merge, isNil } from 'lodash';
import * as querystring from 'querystring';
import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  SortType = SortType;

  @ViewChild(NgxDatatableComponent) datatable: NgxDatatableComponent

  readonly messages = {
    emptyMessage: '',
    totalMessage: 'total'
  };

  @Input() data: any = {};

  @Input() filters: any = {};

  @Input() selection = [];
  columns = [];
  @Input() rows = [];
  @Input() page: any = {};
  @Output() pageChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();
  @Output() pseudoLink = new EventEmitter<any>();

  @Input() sortProps: any;

  // What keys were present in query params. Used to determine if we should
  // reload with new columns.
  keys: string;
  keyParams = [];
  keyColumns = [];
  keyColumnsDisplay = [];

  // Just after ngx-datatable component is initialized, it emits a page
  // event, which will load data before paging params are loaded from
  // query params. We will ignore paging requests until this variable is
  // false (set after query params are loaded).
  ignorePaging = true;

  visible = false;

  pageSize: string = '25';

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private tokenService: AngularTokenService,
              private route: ActivatedRoute,
              private router: Router) { }

  pageSizeChange(size) {
    this.pageSize = size;
    this.pageChange.emit({
      offset: this.page.offset,
      limit: parseInt(size),
      count: this.page.total
    });
  }

  defaultIfUndefined(setting, defaultValue): any {
    if (typeof setting === 'undefined') {
      return defaultValue;
    } else {
      return setting;
    }
  }

  ngOnChanges(changes) {
    if (changes.data) {
      this.loadColumns();
      this.datatable._offsetX.next(0);
    }

    if (changes.page) {
      const limit = changes.page.currentValue.limit;
      const offset = changes.page.currentValue.offset;
      const total = changes.page.currentValue.total;

      this.pageSize = `${limit}`;

      // Correct offset if there are no results at the current offset. The
      // API will simply return no results, but page navigation doesn't
      // display properly with invalid offset/limit parameters.
      if (total > 0 && offset * limit >= total) {
        this.pageChange.emit({
          offset: Math.max(0, Math.ceil(total / limit) - 1), // Last page offset
          count: total,
          limit: limit
        });
      }
    }
  }

  pseudoLinkClicked(row) {
    this.pseudoLink.emit(row);
  }

  getDisplayedColumns() {
    return this.data.display;
  }

  getColumnInfo(name) {
    return this.data.columns[name];
  }

  ngOnInit() {
    if (this.data) {
      this.loadColumns();
    }
  }

  loadColumns() {
    const display = this.data.display || [];
    // Convert display configuration to columns for ngx-datatable
    this.columns = display.map(column => {
      return {
        prop: column.name,
        name: this.data.columns[column.name].title
      };
    });
  }

  // Set as callback for built-in ngx-datatable row selection
  onSelect({ selected }) {
    this.selectionChange.emit(selected);
  }

  // For single-select, use a custom event callback
  onRadioChangeFn(event, row) {
    this.selectionChange.emit([row]);
  }

  onPage(page) {
    if (!page.count) {
      return;
    }

    this.pageChange.emit({
      offset: page.offset,
      limit: page.limit,
      count: page.count
    });
  }

  onSort(event) {
    let sorts = event.sorts.map(s => {
      let prop = s.prop;
      let dir = s.dir === 'desc' ? '-' : '';
      return `${dir}${prop}`;
    });

    this.sortChange.emit(sorts);
  }

  openFilterDialog() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AngularTokenService } from 'angular-token';
import { DatatableComponent as NgxDatatableComponent } from '@swimlane/ngx-datatable';

import { get, isArray, isEqual, merge } from 'lodash';
import * as querystring from 'querystring';
import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @ViewChild(NgxDatatableComponent) datatable: NgxDatatableComponent

  readonly messages = {
    emptyMessage: '',
    totalMessage: 'total'
  };

  @Input() data: any;

  @Input() filters: any = {};

  @Input() selection = [];
  columns = [];
  @Input() rows = [];
  @Input() page: any = {};
  @Output() pageChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();
  @Output() pseudoLink = new EventEmitter<any>();
  sort;
  sorts = [];
  pageLimit;
  pageOffset;
  itemCount;

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

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private tokenService: AngularTokenService,
              private route: ActivatedRoute,
              private router: Router) { }

  defaultIfUndefined(setting, defaultValue): any {
    if (typeof setting === 'undefined') {
      return defaultValue;
    } else {
      return setting;
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
    // Convert display configuration to columns for ngx-datatable
    this.columns = this.data.display.map(column => {
      return {
        prop: column.name,
        name: this.data.columns[column.name].title
      };
    });
  }

  generateSorts() {
    this.sorts = [];
    this.sort.split(',').forEach(sort => {
      let dir = 'asc';
      if (sort.startsWith('-')) {
        dir = 'desc';
        sort = sort.slice(1);
      }
      this.sorts.push({
        prop: sort,
        dir: dir
      });
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

  setPage(page) {
    if (!page.count) {
      return;
    }

    this.pageChange.emit({
      offset: page.offset,
      limit: page.limit,
      total: page.count
    });
  }

  onSort(event) {
    this.sortChange.emit(event);
  }

}

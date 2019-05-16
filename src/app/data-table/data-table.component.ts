import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AngularTokenService } from 'angular-token';

import * as querystring from 'querystring';
import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  readonly messages = {
    emptyMessage: '',
    totalMessage: 'total'
  };

  @Input() data: any;
  @Input() outlet: string | null;

  selected = [];
  columns = [];
  rows = [];
  meta: any = {};
  pageSize = 25;
  currentPage = 1;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private tokenService: AngularTokenService,
              private route: ActivatedRoute) { }

  defaultIfUndefined(setting, defaultValue): any {
    if (typeof setting === 'undefined') {
      return defaultValue;
    } else {
      return setting;
    }
  }

  ngOnInit() {
    this.reload();
  }

  // Reload the contents of the data table. If a new data configuration is
  // provided, use that one instead.
  reload(data?) {
    this.selected = [];

    if (data) {
      this.data = Object.assign({}, data);
    }

    // Convert display configuration to columns for ngx-datatable
    this.columns = this.data.display.map(column => {
      return {
        prop: column.name,
        name: this.data.columns[column.name].title
      };
    });

    // If params for resource request provided, set those.
    let params = Object.assign({}, this.data.params || {});

    params.page = this.currentPage;
    params.limit = this.pageSize;

    const qs = querystring.stringify(params);

    this.http.get(`${this.data.resource}?${qs}`).subscribe((json: any) => {
      this.rows = json.data;
      this.meta = json.meta;
    }, (json: any) => {
      json.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

  // Set as callback for built-in ngx-datatable row selection
  onSelect({ selected }) {
    this.selected = [];
    this.selected.push(...selected);
  }

  // For single-select, use a custom event callback
  onRadioChangeFn(event, row) {
    this.selected = [row];
  }

  setPage(page) {
    this.currentPage = page.offset + 1;
    this.reload();
  }

}

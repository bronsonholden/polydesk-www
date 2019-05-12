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

  messages = {
    emptyMessage: '',
    totalMessage: 'total'
  }

  @Input() data: any;

  selected = [];
  columns = [];
  rows = [];
  meta = {};
  pageSize = 25;
  currentPage = 1;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private tokenService: AngularTokenService,
              private route: ActivatedRoute) {
  }

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

  reload(data?) {
    this.selected = [];

    if (data) {
      this.data = Object.assign({}, data);
    }

    this.columns = this.data.display.map(column => {
      return {
        prop: column.name,
        name: this.data.columns[column.name].title
      };
    });


    const account = this.route.snapshot.root.children[0].params.account;
    const base = this.tokenService.tokenOptions.apiBase;
    const params = {
      page: this.currentPage,
      limit: this.pageSize
    };
    const qs = querystring.stringify(params);

    this.http.get(`${base}/${account}/${this.data.resource}?${qs}`).subscribe((json: any) => {
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

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onRadioChangeFn(event, row) {
    this.selected = [row];
  }

  setPage(page) {
    this.currentPage = page.offset + 1;
    this.reload();
  }

}

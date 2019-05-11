import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AngularTokenService } from 'angular-token';

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

    let accountIdentifier = this.route.snapshot.root.children[0].params.account;

    this.columns = this.data.display.map(column => {
      return {
        prop: column.name,
        name: this.data.columns[column.name].title
      };
    });

    this.http.get(`${this.tokenService.tokenOptions.apiBase}/${accountIdentifier}/${this.data.resource}`).subscribe((json: any) => {
      this.rows = json.data;
    }, (json: any) => {
      json.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

  onSelect(event) {
  }

  onRadioChangeFn(event, row) {
    this.selected = [row];
  }

}

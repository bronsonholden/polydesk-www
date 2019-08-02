import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  pageLimit;
  pageOffset;
  itemCount;

  // Just after ngx-datatable component is initialized, it emits a page
  // event, which will load data before paging params are loaded from
  // query params. We will ignore paging requests until this variable is
  // false (set after query params are loaded).
  ignorePaging = true;

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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pageOffset = parseInt(params['offset']) || 0;
      this.pageLimit = parseInt(params['limit']) || 25;
      this.reload();

      setTimeout(() => {
        this.ignorePaging = false;
      }, 500);
    });
  }

  setData(data) {
    this.data = Object.assign({}, data);
  }

  // Reload the contents of the data table. If a new data configuration is
  // provided, use that one instead.
  reload(data?) {
    this.selected = [];

    if (data) {
      this.setData(data);
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

    if (this.pageOffset && this.pageLimit) {
      params['page[offset]'] = this.pageOffset;
      params['page[limit]'] = this.pageLimit;
    }

    const qs = querystring.stringify(params);

    this.http.get(`${this.data.resource}?${qs}`).subscribe((json: any) => {
      this.rows = json.data;
      this.itemCount = json.meta['item-count'];
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
    if (this.ignorePaging) {
      return;
    }

    if (this.outlet) {
      this.pageOffset = page.offset;
      this.pageLimit = page.limit;
    } else {
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: {
          'offset': page.offset,
          'limit': page.limit
        },
        queryParamsHandling: 'merge'
      });
    }

    this.reload();
  }

}

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AngularTokenService } from 'angular-token';

import { get } from 'lodash';
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
  sort;
  sorts = [];
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

  hasLoadedPagination(): boolean {
    console.log(typeof this.pageLimit, typeof this.pageOffset);
    return typeof this.pageLimit === 'number' && typeof this.pageOffset === 'number';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Load query params that pertain to this data table (pagination
      // params for named outlets will have the outlet name in brackets).
      const offsetParam = `offset${this.outlet ? `[${this.outlet}]` : ''}`;
      const limitParam = `limit${this.outlet ? `[${this.outlet}]` : ''}`;
      const sortParam = `sort`;
      let newSort = get(params, sortParam);
      let newOffset = parseInt(get(params, offsetParam));
      let newLimit = parseInt(get(params, limitParam));
      let shouldReload = false;

      // Set default offset here, but only if not already loaded
      if (typeof this.pageOffset !== 'number' && isNaN(newOffset)) {
        newOffset = 0;
      }

      // Set default limit here, but only if not already loaded
      if (typeof this.pageLimit !== 'number' && isNaN(newLimit)) {
        newLimit = 25;
      }

      if (!isNaN(newOffset) && newOffset !== this.pageOffset) {
        shouldReload = true;
        this.pageOffset = newOffset;
      }

      if (!isNaN(newLimit) && newLimit !== this.pageLimit) {
        shouldReload = true;
        this.pageLimit = newLimit;
      }

      if (newSort) {
        // Add sort
        shouldReload = true;
        this.sort = newSort;
      } else if (this.sort) {
        // Clear sort
        shouldReload = true;
        this.sort = null;
        this.sorts = [];
      }

      if (shouldReload) {
        this.reload();
      }

      setTimeout(() => {
        this.ignorePaging = false;
      }, 600);
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

    if (!isNaN(this.pageOffset) && !isNaN(this.pageLimit)) {
      params['page[offset]'] = this.pageOffset;
      params['page[limit]'] = this.pageLimit;
    }

    if (this.sort) {
      params['sort'] = this.sort;
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
      let outlets = {};

      outlets[this.outlet] = '.';

      let queryParams = {};

      queryParams[`offset[${this.outlet}]`] = page.offset;
      queryParams[`limit[${this.outlet}]`] = page.limit;

      this.router.navigate([{ outlets: outlets }], {
        queryParams: queryParams,
        skipLocationChange: true,
        queryParamsHandling: 'merge'
      });
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
  }

  onSort(event) {
    let column = event.column.name;
    let sortString = `${event.newValue === 'desc' ? '-' : ''}${column}`;
    if (this.outlet) {
      let outlets = {};
      outlets[this.outlet] = '.';
      this.router.navigate([{ outlets: outlets }], {
        queryParams: {
          'sort': sortString
        },
        skipLocationChange: true,
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: {
          'sort': sortString
        },
        queryParamsHandling: 'merge'
      });
    }
  }

}

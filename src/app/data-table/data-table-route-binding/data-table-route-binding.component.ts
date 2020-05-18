import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { without, merge, isNil } from 'lodash';

/**
 * A wrapper that binds data table pagination, filtering, and sorting to query
 * params in the currently activated route.
 */
@Component({
  selector: 'app-data-table-route-binding',
  templateUrl: './data-table-route-binding.component.html',
  styleUrls: ['./data-table-route-binding.component.scss']
})
export class DataTableRouteBindingComponent implements OnInit {

  @Input() data: any = {};
  // Service for retrieving records. Must implement an index() method
  //    index(offset, limit, sort, filter)
  @Input() source: any = null;
  @Input() selection: any = [];
  @Output() selectionChange = new EventEmitter<any>();
  @Input() filter: any = {};
  @Input() query: any = {};
  // An intrinsic filter that can't be overridden with filter query params
  @Input() scope: any = {};
  rows: any = [];
  page: any = {};
  sort: any;
  sortProps: any;

  private outlet: string | null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.route.outlet !== 'primary') {
      this.outlet = this.route.outlet;
    }

    this.route.queryParams.subscribe(params => {
      const offsetParam = `offset${this.outlet ? `[${this.outlet}]` : ''}`;
      const limitParam = `limit${this.outlet ? `[${this.outlet}]` : ''}`;
      const filterParam = `filter${this.outlet ? `[${this.outlet}]` : ''}`;
      const sortParam = `sort${this.outlet ? `[${this.outlet}]` : ''}`;
      let shouldReload = false;

      if (isNil(this.page.offset) || isNil(this.page.limit)) {
        shouldReload = true;
      }

      if (!isNil(params[offsetParam]) || !isNil(params[limitParam])) {
        shouldReload = true;
        this.page.offset = params[offsetParam] || 0;
        this.page.limit = params[limitParam] || 25;
      }

      let hasFilterParams = false;

      for (let key of Object.keys(params)) {
        if (key.match(/^filter\[(.*)\]$/)) {
          hasFilterParams = true;
          break;
        }
      }

      if (hasFilterParams) {
        shouldReload = true;
        const filterKeys = Object.keys(params).filter(k => k.startsWith(`${filterParam}[`) && k.endsWith(']')).map(k => k.replace(filterParam, 'filter'));
        this.filter = filterKeys.reduce((result, filter) => {
          const res = filter.match(/^filter\[(.*)\]$/);
          if (res) {
            result[res[1]] = params[filter];
          }
          return result;
        }, {});
      } else {
        this.filter = {};
      }

      const sortString = params[sortParam];
      if (!isNil(sortString)) {
        this.sort = params[sortParam].split(',').filter(p => p !== '');
        if (this.sort.length > 0) {
          shouldReload = true;
        }
        this.updateDataTableSortProps(this.sort);
      } else if (this.sort) {
        this.sort = [];
        shouldReload = true;
      }

      if (shouldReload) {
        this.reload();
      }
    });
  }

  // Update the internal ngx-datatable property sort settings. This affects
  // how column headers are displayed, and is downstream from the 'sort'
  // query parameter.
  updateDataTableSortProps(sort) {
    this.sortProps = sort.map(s => {
      let prop = s;
      let dir = 'asc';
      if (prop.startsWith('-')) {
        dir = 'desc';
        prop = prop.slice(1);
      }
      return { dir, prop };
    });
  }

  getColDataPath(col) {
    switch (col.type) {
      case 'id':
        return "prop('id')";
      case 'link':
        // Prevent infinite loops
        if (col.link.type !== 'link') {
          return this.getColDataPath(col.link);
        }
      case 'json':
      case 'attribute':
        return `prop('${col.value}')`;
      case 'generated':
        return this.data.generate[col.value];
      default:
        ;
    }

    return null;
  }

  reload() {
    if (this.source) {
      const filter = merge(this.filter, this.scope);
      let sortArray = this.scrubSort(this.sort || []);
      this.sort = sortArray;
      this.updateSortParam(this.sort);
      const sort = sortArray.map(s => {
        let prop = s;
        let dir = 'asc';
        if (prop.startsWith('-')) {
          prop = prop.slice(1);
          dir = 'desc';
        }
        const col = this.data.columns[prop];

        if (col.sortAs) {
          return `${dir}(${col.sortAs})`
        }

        let v = this.getColDataPath(col);
        if (v) {
          return `${dir}(${v})`;
        } else {
          setTimeout(() => {
            this.snackBar.open(`We can't sort by column '${prop}'; its source (${col.type}) is not sortable.`, null, {
              duration: 5000
            });
          });
        }
      });
      this.source.index(this.page.offset || 0, this.page.limit || 25, merge({ sort }, this.query)).subscribe(res => {
        this.rows = res.data;
        this.page = {
          offset: res.meta['page-offset'],
          limit: res.meta['page-limit'],
          total: res.meta['item-count']
        };
      }, err => {
        console.log(err);
      });
    }
  }

  ngOnChanges(changes) {
    const reloadChanges = [ 'scope', 'filter', 'query', 'data', 'source' ];

    for (let attr of reloadChanges) {
      if (changes[attr] && !changes[attr].firstChange) {
        return this.reload();
      }
    }
  }

  pageChange(page) {
    // Pagination event without count is initial load
    if (isNaN(page.count)) {
      return;
    }

    let outlet = this.route.outlet;
    let route;

    if (outlet === 'primary') {
      route = ['.'];
    } else {
      let outlets = {};
      outlets[outlet] = [];
      route = [{ outlets: outlets }];
    }

    const offsetParam = `offset${this.outlet ? `[${this.outlet}]` : ''}`;
    const limitParam = `limit${this.outlet ? `[${this.outlet}]` : ''}`;

    let queryParams = {};

    queryParams[offsetParam] = page.offset;
    queryParams[limitParam] = page.limit;

    this.router.navigate(route, {
      relativeTo: this.route,
      queryParams: queryParams,
      skipLocationChange: outlet !== 'primary',
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  onSelectionChange(selection) {
    this.selectionChange.emit(selection);
  }

  // TODO: This should occur in raw data table, not route-bound data table
  // wrapper. Latter should pass sort in, and the former should reject it,
  // the same way invalid pagination is rejected and corrected.
  scrubSort(sort) {
    let filteredSort = [];

    // Warn about invalid sorts
    sort.forEach(col => {
      let colId = col;

      if (colId.startsWith('-')) {
        colId = colId.slice(1);
      }

      const sortedCol = this.data.columns[colId];

      // Bring up snackbar(s) on next tick in case scrub on page init
      // triggers one.
      if (!sortedCol) {
        setTimeout(() => {
          this.snackBar.open(`We can't sort by column '${colId}'; it does not exist.`, null, {
            duration: 5000
          });
        }, 0);
      } else {
        let colRef = sortedCol;

        if (colRef.display == 'link') {
          colRef = colRef.link;
        }

        filteredSort.push(col);
      }
    });

    this.updateDataTableSortProps(filteredSort);

    return filteredSort;
  }

  // Update the 'sort' query param using the given sort array.
  updateSortParam(sort) {
    let outlet = this.route.outlet;
    let sortString;

    if (sort.length > 0) {
      sortString = this.sort.join(',');
    }

    if (outlet !== 'primary') {
      let outlets = {};
      outlets[outlet] = [];
      this.router.navigate([{ outlets: outlets }], {
        queryParams: {
          'sort': sortString
        },
        relativeTo: this.route,
        skipLocationChange: true,
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    } else {
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: {
          'sort': sortString
        },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }
  }

  // Triggers when a column is sorted by clicking on the column header.
  sortChange(sort) {
    // Scrub and store new sort configuration
    this.sort = this.scrubSort(sort);

    this.updateSortParam(sort);
  }

}

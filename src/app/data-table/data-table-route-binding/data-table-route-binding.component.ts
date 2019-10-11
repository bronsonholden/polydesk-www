import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { merge, isNil } from 'lodash';

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

  @Input() data: any = null;
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
              private router: Router) { }

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
        this.sort = params[sortParam].split(',');
        if (this.sort.length > 0) {
          shouldReload = true;
        }
        this.sortProps = this.sort.map(s => {
          let prop = s;
          let dir = 'asc';
          if (prop.startsWith('-')) {
            dir = 'desc';
            prop = prop.slice(1);
          }
          return { dir, prop };
        });
      } else if (this.sort) {
        this.sort = [];
        shouldReload = true;
      }

      if (shouldReload) {
        this.reload();
      }
    });
  }

  getColDataPath(col) {
    if (col.display === 'link') {
      return this.getColDataPath(col.link);
    }

    if (col.type === 'json' || col.type === 'attribute') {
      return col.value;
    }

    return null;
  }

  reload() {
    if (this.source) {
      const filter = merge(this.filter, this.scope);
      let sortArray = this.sort || [];
      const sort = sortArray.map(s => {
        let prop = s;
        let dir = '';
        if (prop.startsWith('-')) {
          prop = prop.slice(1);
          dir = '-';
        }
        const col = this.data.columns[prop];

        if (col.sortAs) {
          return `${dir}${col.sortAs}`
        }

        let v = this.getColDataPath(col);
        if (v) {
          return `${dir}${v}`;
        }

        return `${dir}${prop}`;
      });
      this.source.index(this.page.offset || 0, this.page.limit || 25, sort, filter, this.query).subscribe(res => {
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
      queryParamsHandling: 'merge'
    });
  }

  onSelectionChange(selection) {
    this.selectionChange.emit(selection);
  }

  sortChange(sort) {
    let sortString;
    let outlet = this.route.outlet;

    // Store sort configurations
    this.sort = sort;

    if (sort.length > 0) {
      sortString = sort.join(',');
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

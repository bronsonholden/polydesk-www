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
  // An intrinsic filter that can't be overridden with filter query params
  @Input() scope: any = {};
  rows: any = [];
  page: any = {};
  sort: any;
  sorts: any = {};

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
      let shouldReload = false;

      if (isNil(this.page.offset) || isNil(this.page.limit)) {
        shouldReload = true;
      }

      if (!isNil(params[offsetParam]) || !isNil(params[limitParam])) {
        shouldReload = true;
        this.page.offset = params[offsetParam] || 0;
        this.page.limit = params[limitParam] || 25;
      }

      if (!isNil(params[filterParam])) {
        shouldReload = true;
        const filterKeys = Object.keys(params).filter(k => k.startsWith(`${filterParam}[`) && k.endsWith(']')).map(k => k.replace(filterParam, 'filter'));
        this.filter = filterKeys.reduce((result, filter) => {
          const res = filter.match(/^filter\[(.*)\]$/);
          if (res) {
            result[res[1]] = params[filter];
          }
          return result;
        }, {});
      }

      if (shouldReload) {
        this.reload();
      }
    });
  }

  reload() {
    if (this.source) {
      const filter = merge(this.filter, this.scope);
      this.source.index(this.page.offset || 0, this.page.limit || 25, this.sort, filter).subscribe(res => {
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
    const reloadChanges = [ 'scope', 'filter' ];

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

  sortChange(event) {
    // Store sort configurations
    this.sorts = event.sorts;
    let sortString = `${event.newValue === 'desc' ? '-' : ''}${event.column.name}`;
    let outlet = this.route.outlet;
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { merge } from 'lodash';

@Component({
  selector: 'app-data-table-binding',
  templateUrl: './data-table-binding.component.html',
  styleUrls: ['./data-table-binding.component.scss']
})
export class DataTableBindingComponent implements OnInit {

  @Input() data: any = {};
  @Input() page: any = {};
  @Input() source: any = null;
  @Input() selection: any = [];
  @Input() filter: any = {};
  @Input() scope: any = {};
  @Input() sort: any = [];
  @Output() pageChange = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();
  @Output() pseudoLink = new EventEmitter<any>();

  rows: any = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    const reloadTriggers = [
      'data',
      'filter',
      'page',
      'scope',
      'sort',
      'source'
    ];

    // Only reload if one or more select inputs are changed.
    const keys = Object.keys(changes);
    for (let trigger of reloadTriggers) {
      if (keys.indexOf(trigger) > -1) {
        this.reload();
        break;
      }
    }
  }

  pseudoLinkClicked(row) {
    this.pseudoLink.emit(row);
  }

  onPageChange(page) {
    this.page = page;
    this.reload();
  }

  onSortChange(sort) {
    this.sort = sort.sorts.map(s => `${s.dir === 'desc' ? '-' : ''}${s.prop}`);
    this.sortChange.emit(this.sort);
  }

  onSelectionChange(selection) {
    this.selection = selection;
    this.selectionChange.emit(selection);
  }

  reload() {
    const filter = merge(this.filter, this.scope);
    let sort;

    if (this.sort.length > 0) {
      sort = this.sort.join(',');
    }

    this.source.index(this.page.offset || 0, this.page.limit || 25, sort, filter).subscribe(res => {
      // Any time the table changes, remove selection
      this.onSelectionChange([]);
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

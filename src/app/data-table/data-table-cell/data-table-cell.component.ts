import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DataTableDialogComponent } from '../data-table-dialog/data-table-dialog.component';
import { JsonAccessorService } from '../../json-accessor.service';
import { FormSubmissionApiService } from '../../form-submission-api.service';
import * as Url from 'url';
import { Subject } from 'rxjs';

import * as moment from 'moment';
import { get, merge } from 'lodash';

@Component({
  selector: 'app-data-table-cell',
  templateUrl: './data-table-cell.component.html',
  styleUrls: ['./data-table-cell.component.scss']
})
export class DataTableCellComponent implements OnInit {

  @Input() data: any;
  @Input() row: any;
  @Input() column: any;
  @Input() outlet: string | null;
  @Output() pseudoLink = new EventEmitter<any>();

  _value: any;

  constructor(public dialog: MatDialog,
              public router: Router,
              private formSubmissionApi: FormSubmissionApiService,
              private jsonAccessorService: JsonAccessorService) { }

  ngOnInit() {
  }

  createAggregateFilters() {
    const filter = this.column.filter.reduce((combined, f) => {
      combined[f.key] = `${f.operator}:${this.resolveArg(f.operand)}`;
      return combined;
    }, {});
    return filter;
  }

  get value(): any {
    let columnInfo = this.column;
    let val = this.raw;

    switch (this.columnDisplay) {
      case 'date':
        let m = moment(val);
        if (columnInfo.format) {
          val = m.format(columnInfo.format);
        } else {
          val = moment.duration(m.diff(moment())).humanize(true);
        }

        break;
      case 'switch':
        if (val == null) {
          val = columnInfo.case.null;
        } else {
          val = columnInfo.case[val];
        }

        break;
      default:
        ;
    }

    if (typeof val === 'undefined') {
      if (typeof columnInfo.default !== 'undefined') {
        val = columnInfo.default;
      } else {
        val = { type: 'literal', value: '', display: 'text' };
      }
    }

    return val;
  }

  get raw(): any {
    return this.resolveArg(this.column);
  }

  calcAggregate() {
    return this._value;
  }

  calcSum() {
    return this._value;
  }

  getTooltip() {
    const tooltip = this.column.tooltip;

    if (tooltip == null) {
      return null;
    } else if (typeof tooltip === 'string') {
      return tooltip;
    } else if (typeof tooltip === 'object') {
      let string = tooltip.format;

      tooltip.args.forEach((arg, idx) => {
        let regexp = new RegExp(`([^\\$]|^)\\$${idx + 1}`);
        string = string.replace(regexp, `$1${this.resolveArg(arg)}`)
      });

      return string.replace('$$', '$');
    }
  }

  resolveJsonArg(obj, keys, defaultValue) {
    return this.jsonAccessorService.access(obj, keys, defaultValue);
  }

  resolveArg(arg) {
    let columnInfo = arg;

    switch (columnInfo.type) {
      case 'id':
        return this.row.id;
      case 'type':
        return this.row.type;
      case 'meta':
        return this.row.meta[columnInfo.value];
      case 'attribute':
        return this.row.attributes[columnInfo.value];
      case 'json':
        return this.resolveJsonArg(this.row.attributes, columnInfo.value, '');
      case 'literal':
        return columnInfo.value;
      case 'concat':
        return columnInfo.value.parts.map(part => this.resolveArg(part)).join(columnInfo.value.separator || '')
      default:
        return '';
    }
  }

  routeTo() {
    // Skip updating location if routing is occurring in a named outlet
    this.router.navigate(this.getRouterLink(), {
      skipLocationChange: !!this.outlet
    });
  }

  pseudoLinkClicked() {
    this.pseudoLink.emit(this.row);
  }

  getLink() {
    if (this.column.pathPrefix) {
      return `${this.column.pathPrefix}/${this.value}`
    } else {
      return this.value;
    }
  }

  getRouterLink() {
    let outlets = {};

    if (this.outlet) {
      outlets[this.outlet] = this.getLink();
      return [ '', { outlets: outlets } ];
    } else {
      outlets[this.outlet] = null;
      return [ this.getLink(), { outlets: outlets } ];
    }
  }

  get columnDisplay() {
    return this.column.display;
  }

  showLink(column): boolean {
    return this.column.link;
  }

}

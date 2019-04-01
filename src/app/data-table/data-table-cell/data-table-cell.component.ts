import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataTableDialogComponent } from '../data-table-dialog/data-table-dialog.component';
import * as Url from 'url';

import * as moment from 'moment';

@Component({
  selector: 'app-data-table-cell',
  templateUrl: './data-table-cell.component.html',
  styleUrls: ['./data-table-cell.component.scss']
})
export class DataTableCellComponent implements OnInit {

  @Input() row: any;
  @Input() column: any;
  @Input() data: any;

  constructor(public dialog: MatDialog) { }

  get value(): any {
    let columnInfo = this.data.columns[this.column.name];
    let val = this.raw;

    switch (this.columnDisplay) {
      case 'date':
        val = moment(val).format(columnInfo.format || 'MM/DD/YYYY');
        break;
      default:
        ;
    }

    return val;
  }

  get raw(): any {
    let columnInfo = this.data.columns[this.column.name];

    switch (columnInfo.type) {
      case 'id':
        return this.row.data.id;
      case 'attribute':
        return this.row.data.attributes[columnInfo.value];
      case 'literal':
        return columnInfo.value;
      case 'relationship':
        let path = Url.parse(this.row.data.relationships[columnInfo.model].links.related).pathname;
        return path.split('/').slice(2).join('/');
      default:
        return '';
    }
  }

  get selfLink(): string {
    let url = Url.parse(this.row.data.links.self);

    return url.pathname;
  }

  ngOnInit() {
  }

  get columnDisplay() {
    return this.data.columns[this.column.name].display;
  }

  showLink(column): boolean {
    return this.data.columns[column.name].link;
  }

  openRelationshipDialog() {
    let columnInfo = this.data.columns[this.column.name];
    let data: any = {};

    Object.assign(data, columnInfo.view);
    data.resource = this.value;

    let dialogRef = this.dialog.open(DataTableDialogComponent, {
      width: '100vw',
      data: data
    });
  }

}

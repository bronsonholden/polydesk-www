import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { AngularTokenService } from 'angular-token';


export class DataTableElement {
  constructor(public data: any,
              public blah: any) { }
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() data: any;

  dataTableElements: MatTableDataSource<DataTableElement>;

  displayedColumns: string[] = [];

  displayValue(row, column) {
    switch (column.type) {
      case 'id':
        return row.data.id;
      case 'attribute':
        return row.data.attributes[column.value];
      case 'literal':
        return column.value;
      case 'relationship':
        return 'NYI';
      default:
        return '';
    }
  }

  getHeader(column) {
    return column.title;
  }

  constructor(private http: HttpClient,
              private tokenService: AngularTokenService) {
  }

  ngOnInit() {
    this.data.columns.forEach(column => {
      this.displayedColumns.push(column.name);
    });

    this.http.get(`${this.tokenService.tokenOptions.apiBase}/test/${this.data.resource}`).subscribe(res => {
      this.dataTableElements = new MatTableDataSource<ContentElement>(res.data.map(element => new DataTableElement(element)));
    }, (json: any) => {
      json.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

  trackByFn(index, item) {
    return index;
  }

}

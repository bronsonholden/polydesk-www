import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reportListData = {
    resource: 'reports',
    selectable: true,
    columns: {
      id: {
        title: 'ID',
        type: 'id'
      },
      name: {
        title: 'Name',
        type: 'attribute',
        value: 'name'
      },
      createdAt: {
        title: 'Created At',
        type: 'attribute',
        value: 'created_at'
      },
      updatedAt: {
        name: 'updated_at',
        title: 'Updated At',
        type: 'attribute',
        value: 'updated_at'
      }
    },
    display: [
      {
        name: 'id',
        width: 50
      },
      {
        name: 'name',
        width: 300
      },
      {
        name: 'createdAt',
        width: 180
      },
      {
        name: 'updatedAt',
        width: 180
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}

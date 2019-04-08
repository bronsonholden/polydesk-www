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
        display: 'text',
        type: 'id'
      },
      name: {
        title: 'Name',
        display: 'link',
        type: 'attribute',
        value: 'name'
      },
      createdAt: {
        title: 'Created At',
        display: 'date',
        type: 'attribute',
        value: 'created_at'
      },
      updatedAt: {
        title: 'Updated At',
        display: 'date',
        type: 'attribute',
        value: 'updated_at'
      }
    },
    display: [
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

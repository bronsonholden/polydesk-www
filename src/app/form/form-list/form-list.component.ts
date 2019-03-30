import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  data = {
    resource: 'forms',
    selectable: true,
    columns: {
      id: {
        title: 'ID',
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
        format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'created_at'
      },
      updatedAt: {
        name: 'updated_at',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
        title: 'Updated At',
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

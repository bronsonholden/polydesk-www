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
        type: 'attribute',
        value: 'name',
        link: true
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

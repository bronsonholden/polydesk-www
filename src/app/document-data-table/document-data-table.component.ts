import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-data-table',
  templateUrl: './document-data-table.component.html',
  styleUrls: ['./document-data-table.component.scss']
})
export class DocumentDataTableComponent implements OnInit {

  data = {
    resource: 'folders',
    columns: [
      {
        type: 'select',
        by: 'id'
      },
      {
        name: 'id',
        title: 'ID',
        type: 'id'
      },
      {
        name: 'name',
        title: 'Name',
        type: 'attribute',
        value: 'name'
      },
      {
        name: 'created_at',
        title: 'Created At',
        type: 'attribute',
        value: 'created_at'
      },
      {
        name: 'updated_at',
        title: 'Updated At',
        type: 'attribute',
        value: 'updated_at'
      },
      {
        name: 'literaldata',
        title: 'Literal Data',
        type: 'literal',
        value: 'Some text'
      },
      {
        name: 'documents',
        title: 'Documents',
        type: 'relationship',
        model: 'documents',
        display: 'count',
        link: true
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}

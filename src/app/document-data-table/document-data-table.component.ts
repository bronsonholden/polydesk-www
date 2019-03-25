import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-data-table',
  templateUrl: './document-data-table.component.html',
  styleUrls: ['./document-data-table.component.scss']
})
export class DocumentDataTableComponent implements OnInit {

  data = {
    resource: 'folders',
    columns: {
      select: {
        type: 'select',
        by: 'id'
      },
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
      },
      literalData: {
        title: 'Literal Data that has a really long header, like really really long',
        type: 'literal',
        value: 'Some text'
      },
      documents: {
        title: 'Documents',
        type: 'relationship',
        model: 'documents',
        display: 'count',
        link: true
      }
    },
    display: [
      {
        name: 'id',
        width: 30
      },
      {
        name: 'name',
        width: 100
      },
      {
        name: 'createdAt',
        width: 80
      },
      {
        name: 'updatedAt',
        width: 160
      },
      {
        name: 'literalData',
        width: 40
      },
      {
        name: 'documents',
        width: 100
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}

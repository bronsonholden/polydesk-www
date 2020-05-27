import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlueprintApiService } from '../blueprint-api.service';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss']
})
export class DeskComponent implements OnInit {

  selection: any = [];
  scope: any = {};
  tableConfig: any = {
    select: 'multiple',
    columns: {
      name: {
        title: 'Name',
        display: 'link',
        type: 'concat',
        sortAs: "prop('name')",
        value: {
          separator: '/',
          parts: [
            {
              type: 'literal',
              value: 'desk'
            },
            {
              type: 'attribute',
              value: 'namespace'
            }
          ]
        },
        link: {
          display: 'text',
          type: 'attribute',
          value: 'name'
        }
      },
      namespace: {
        title: 'Namespace',
        display: 'text',
        type: 'attribute',
        value: 'namespace'
      },
      edit: {
        title: 'Edit',
        display: 'link-icon',
        type: 'concat',
        value: {
          separator: '/',
          parts: [
            {
              type: 'literal',
              value: 'desk'
            },
            {
              type: 'attribute',
              value: 'namespace'
            },
            {
              type: 'literal',
              value: 'edit'
            }
          ]
        },
        link: {
          type: 'literal',
          value: 'pencil'
        }
      }
    },
    display: [
      {
        name: 'name',
        width: 250,
        resizeable: true,
        sortable: true
      },
      {
        name: 'namespace',
        width: 150,
        resizeable: true,
        sortable: true
      },
      {
        name: 'edit',
        width: 80,
        resizeable: false,
        sortable: false
      }
    ]
  };

  constructor(private activatedRoute: ActivatedRoute,
              public location: Location,
              public blueprintApi: BlueprintApiService) { }

  ngOnInit() {
  }

}

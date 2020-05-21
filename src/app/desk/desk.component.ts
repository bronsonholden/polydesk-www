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
  data: any = {
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
      }
    ]
  };

  constructor(private activatedRoute: ActivatedRoute,
              public location: Location,
              public blueprintApi: BlueprintApiService) { }

  ngOnInit() {
  }

}

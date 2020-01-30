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
      id: {
        title: 'ID',
        display: 'text',
        type: 'id'
      },
      name: {
        title: 'Name',
        display: 'link',
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
            }
          ]
        },
        link: {
          display: 'text',
          type: 'attribute',
          value: 'name'
        }
      }
    },
    display: [
      {
        name: 'id',
        width: 60,
        resizeable: false,
        sortable: true
      },
      {
        name: 'name',
        width: 150,
        resizeable: true,
        sortable: true
      }
    ]
  };

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private blueprintApi: BlueprintApiService) { }

  ngOnInit() {
  }

}

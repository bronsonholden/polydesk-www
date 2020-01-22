import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blueprint-construction',
  templateUrl: './blueprint-construction.component.html',
  styleUrls: ['./blueprint-construction.component.scss']
})
export class BlueprintConstructionComponent implements OnInit {

  view = {
    xs: {
      type: 'column',
      fieldGroup: [
        {
          type: 'row',
          fieldGroup: [
            {
              type: 'input',
              key: 'name.first',
              templateOptions: {
                label: 'First Name',
                fxFlex: '100%'
              }
            }
          ]
        },
        {
          type: 'row',
          fieldGroup: [
            {
              type: 'input',
              key: 'name.last',
              templateOptions: {
                label: 'Last Name',
                fxFlex: '100%'
              }
            }
          ]
        }
      ]
    },
    sm: {
      type: 'column',
      fieldGroup: [
        {
          type: 'row',
          fieldGroup: [
            {
              type: 'label',
              text: 'First Name',
              templateOptions: {
                fxFlex: '100px'
              }
            },
            {
              type: 'input',
              key: 'name.first',
              templateOptions: {
                fxFlex: 'auto'
              }
            }
          ]
        },
        {
          type: 'row',
          fieldGroup: [
            {
              type: 'label',
              text: 'Last Name',
              templateOptions: {
                fxFlex: '100px'
              }
            },
            {
              type: 'input',
              key: 'name.last',
              templateOptions: {
                fxFlex: 'auto'
              }
            }
          ]
        }
      ]
    }
  };

  schema: any = {};

  options: any = {};
  model: any = {};

  constructor(private location: Location) { }

  ngOnInit() {
  }

  constructPrefab() {
    console.log(this.model);
  }

}

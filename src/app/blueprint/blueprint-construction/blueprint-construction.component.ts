import { Component, OnInit } from '@angular/core';

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
                fxFlex: '20%'
              }
            },
            {
              type: 'input',
              key: 'name.first',
              templateOptions: {
                fxFlex: '80%'
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
                fxFlex: '20%'
              }
            },
            {
              type: 'input',
              key: 'name.last',
              templateOptions: {
                fxFlex: '80%'
              }
            }
          ]
        },
        // +
        {
          type: 'row',
          fieldGroup: [
            {
              type: 'label',
              text: 'Last Name 2',
              templateOptions: {
                fxFlex: '20%'
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
                fxFlex: '20%'
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
                fxFlex: '20%'
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
                fxFlex: '20%'
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
                fxFlex: '20%'
              }
            }
          ]
        }
        // -
      ]
    }
  };

  schema: any = {};

  options: any = {};
  model: any = {};

  constructor() { }

  ngOnInit() {
  }

}

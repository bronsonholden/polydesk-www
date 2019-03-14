import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-submission',
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent implements OnInit {

  layout = {
    presentation: 'standard',
    sections: [
      {
        direction: 'row',
        spacing: 5,
        fields: [
          'firstName',
          'lastName'
        ]
      },
      {
        direction: 'row',
        spacing: 5,
        fields: [
          'shoppingList'
        ]
      },
      {
        dataSource: 'siblings',
        layout: {
          presentation: 'standard',
          sections: [
            {
              direction: 'row',
              spacing: 5,
              fields: [
                'firstName',
                'lastName'
              ]
            },
            {
              direction: 'row',
              spacing: 0,
              action: 'addSet'
            }
          ]
        }
      },
      {
        dataSource: 'siblings2',
        layout: {
          presentation: 'standard',
          sections: [
            {
              direction: 'row',
              spacing: 5,
              fields: [
                'firstName',
                'lastName'
              ]
            },
            {
              direction: 'row',
              spacing: 0,
              action: 'addSet'
            }
          ]
        }
      },
      {
        dataSource: 'address',
        layout: {
          presentation: 'standard',
          sections: [
            {
              direction: 'row',
              spacing: 5,
              fields: [
                'street1',
                'street2'
              ]
            }
          ]
        }
      }
    ]
  };

  schema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      shoppingList: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      siblings: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' }
          }
        }
      },
      siblings2: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' }
          }
        }
      },
      address: {
        type: 'object',
        properties: {
          street1: {
            type: 'string'
          },
          street2: {
            type: 'string'
          }
        }
      }
    }
  };

  data = {
    many: [
      '1', '2', '3'
    ],
    it: 1,
    shoppingList: [ 'apples', 'oranges', 'potatoes' ],
    siblings: [
      {
        firstName: 'Jane',
        lastName: 'Doe'
      },
      {
        firstName: 'Bob',
        lastName: 'Doe'
      }
    ],
    siblings2: [
      {
        firstName: 'Jim',
        lastName: 'Shmoe'
      },
      {
        firstName: 'Rob',
        lastName: 'Shmoe'
      }
    ]
  };

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.data.many.push('4');
      this.data.it += 1;
    }, 2000);
  }

}

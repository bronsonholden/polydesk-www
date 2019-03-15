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
        columns: 4,
        spacing: 5,
        fields: [
          'firstName',
          'lastName',
          'firstName',
          'firstName',
          'lastName',
        ]
      },
      {
        direction: 'row',
        columns: 2,
        spacing: 5,
        fields: [
          'shoppingList',
          'toDoList'
        ]
      },
      {
        dataSource: 'siblings',
        layout: {
          presentation: 'standard',
          sections: [
            {
              direction: 'row',
              columns: 3,
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
              columns: 3,
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
      toDoList: {
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
    shoppingList: [ 'apples', 'oranges', 'potatoes' ],
    toDoList: [ 'laundry', 'dishes', 'shopping', 'walk dog' ],
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
  }

}

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
        spacing: 0,
        fields: [
          'firstName',
          'lastName'
        ]
      },
      {
        direction: 'row',
        columns: 2,
        spacing: 0,
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
              columns: 4,
              spacing: 0,
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
              columns: 4,
              spacing: 0,
              fields: [
                'street1'
              ]
            },
            {
              direction: 'row',
              columns: 4,
              spacing: 0,
              fields: [
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
        type: 'string',
        title: 'First Name',
        description: 'Your first name'
      },
      lastName: {
        type: 'string',
        title: 'Last Name',
        description: 'Your last name'
      },
      shoppingList: {
        title: 'Shopping List',
        type: 'array',
        items: {
          type: 'string',
          description: 'Item to purchase'
        }
      },
      toDoList: {
        title: 'To-Do List',
        type: 'array',
        items: {
          type: 'string',
          description: 'Thing to get done'
        }
      },
      siblings: {
        title: 'Siblings',
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
        title: 'Address',
        type: 'object',
        properties: {
          street1: {
            type: 'string',
            title: 'Address'
          },
          street2: {
            type: 'string',
            title: 'Address Line 2'
          }
        }
      }
    }
  };

  data = {
    firstName: 'John',
    lastName: 'Doe',
    shoppingList: [
      'Apples',
      'Oranges',
      'Peaches',
      'Scissors'
    ],
    toDoList: [
      'Take out garbage',
      'Feed the dogs',
      'Get hair cut'
    ],
    siblings: [
      {
        firstName: 'Bob',
        lastName: 'Smith'
      },
      {
        firstName: 'Jane',
        lastName: 'Roe'
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}

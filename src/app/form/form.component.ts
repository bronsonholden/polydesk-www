import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      type: 'flex-layout',
      templateOptions: {
        fxLayout: 'column',
        fxLayoutGap: '10px',
      },
      fieldGroup: [
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            fxLayoutGap: '10px'
          },
          fieldGroup: [
            {
              key: 'email',
              type: 'input',
              templateOptions: {
                label: 'Email Address',
                placeholder: 'Enter your email',
                required: true
              }
            },
            {
              key: 'firstName',
              type: 'input',
              templateOptions: {
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: true
              }
            },
            {
              key: 'lastName',
              type: 'input',
              templateOptions: {
                label: 'Last Name',
                placeholder: 'Enter your last name',
                required: true
              }
            }
          ]
        },
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            fxLayoutGap: '10px'
          },
          fieldGroup: [
            {
              key: 'password',
              type: 'input',
              templateOptions: {
                type: 'password',
                label: 'Password',
                placeholder: 'Select a password',
                required: true
              }
            },
            {
              key: 'passwordConfirmation',
              type: 'input',
              templateOptions: {
                type: 'password',
                label: 'Pasword confirmation',
                placeholder: 'Type your password again',
                required: true
              }
            }
          ]
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(model) {
  }

}

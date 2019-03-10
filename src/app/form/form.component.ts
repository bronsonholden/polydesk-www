import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formSchema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        title: 'First Name',
        appearance: 'standard'
      },
      middleName: {
        type: 'string',
        title: 'Middle Name',
        appearance: 'outline'
      },
      lastName: {
        type: 'string',
        title: 'Last Name',
        appearance: 'fill'
      },
      color: {
        type: 'string',
        title: 'Last Name',
        appearance: 'fill'
      }
    }
  };

  formData = {};

  constructor() { }

  ngOnInit() {
  }

}

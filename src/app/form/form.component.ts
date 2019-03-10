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
        type: 'string'
      },
      middleName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

  submitForm(event) {

  }

}

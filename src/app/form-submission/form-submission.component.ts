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
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

}

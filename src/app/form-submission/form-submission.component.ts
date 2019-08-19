import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { get } from 'lodash';

@Component({
  selector: 'app-form-submission',
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent implements OnInit {

  data = '';

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['form-submission']);

      if (typeof id === 'number' && !isNaN(id)) {
        this.httpClient.get(`/form-submissions/${id}`).subscribe(res => {
          let data = get(res, 'data.attributes.data');

          this.data = JSON.stringify(data, null, '    ');
        });
      }
    });
  }

}

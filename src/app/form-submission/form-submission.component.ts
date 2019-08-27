import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormSubmissionApiService } from '../form-submission-api.service';
import { MatSnackBar } from '@angular/material';

import { get } from 'lodash';

@Component({
  selector: 'app-form-submission',
  templateUrl: './form-submission.component.html',
  styleUrls: ['./form-submission.component.scss']
})
export class FormSubmissionComponent implements OnInit {

  data = '';

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private snackBar: MatSnackBar,
              private formSubmissionApiService: FormSubmissionApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['form-submission']);

      if (typeof id === 'number' && !isNaN(id)) {
        this.formSubmissionApiService.getFormSubmission(id).subscribe((res: any) => {
          let data = get(res, 'data.attributes.data');

          this.data = JSON.stringify(data, null, '    ');
        });
      }
    });
  }

  cancelSave() {
    this.location.back();
  }

  saveFormSubmission() {
    const formSubmissionId = this.route.snapshot.params['form-submission'];

    try {
      let data = JSON.parse(this.data);
      console.log(data);

      this.formSubmissionApiService.updateFormSubmission(formSubmissionId, {
        data: data
      }).subscribe((res: any) => {
        this.router.navigate(['..'], {
          relativeTo: this.route
        });
      }, err => {
        for (let error of err.error.errors) {
          this.snackBar.open(error.title, 'OK', {
            duration: 5000
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

}

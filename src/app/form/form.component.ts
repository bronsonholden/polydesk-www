import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormSubmissionApiService } from '../form-submission-api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public formSubmissionApiService: FormSubmissionApiService,
              private formlyJsonschema: FormlyJsonschema) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.formId = params.id;
    });
  }

  onCancel() {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    });
  }

  onSubmit(data) {
    this.formSubmissionApiService.createFormSubmission(this.formId, data.model, data.draft ? 'draft' : 'published').subscribe((result: any) => {
      this.router.navigate(['..'], {
        relativeTo: this.activatedRoute
      });
    }, (err: any) => {
      err.error.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

}

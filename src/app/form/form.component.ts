import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { LAYOUT_SCHEMA } from './layout.schema';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  model: any = {};
  fields: FormlyFieldConfig[] = [];
  formName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  ngOnInit() {
    const formId = this.activatedRoute.snapshot.params.id;

    this.httpClient.get(`forms/${formId}`).subscribe((result: any) => {
      this.fields = result.data.attributes.layout.fields || [];
      this.formName = result.data.attributes.name;
    }, (err: any) => {
      err.error.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

  onSubmit(data) {
    // data.model
    // data.draft
  }

}

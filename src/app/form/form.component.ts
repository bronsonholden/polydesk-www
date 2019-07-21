import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

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
              private router: Router,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient,
              private formlyJsonschema: FormlyJsonschema) { }

  ngOnInit() {
    const formId = this.activatedRoute.snapshot.params.id;

    this.httpClient.get(`forms/${formId}`).subscribe((result: any) => {
      const schema = result.data.attributes.schema;
      this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
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
    const formId = this.activatedRoute.snapshot.params.id;
    const params = {
      data: {
        type: 'form-submissions',
        attributes: {
          data: data.model,
          state: data.draft ? 'draft' : 'published'
        },
        relationships: {
          form: {
            data: {
              id: formId,
              type: 'forms'
            }
          }
        }
      }
    };

    this.httpClient.post('form-submissions', params).subscribe((result: any) => {
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

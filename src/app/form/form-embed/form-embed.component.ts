import { Component, Input, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { get, isArray } from 'lodash';

@Component({
  selector: 'app-form-embed',
  templateUrl: './form-embed.component.html',
  styleUrls: ['./form-embed.component.scss']
})
export class FormEmbedComponent implements OnInit {

  form = new FormGroup({});
  @Input() formId: string;
  @Input() model: any;
  @Input() readOnly = false;
  fields: FormlyFieldConfig[];
  @Input() options: FormlyFormOptions = {};
  formName: string;

  showForm = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient,
              private formlyJsonschema: FormlyJsonschema) { }

  ngOnInit() {
  }

  applyTemplateOptions(fieldGroup) {
    for (let group of fieldGroup) {
      group.expressionProperties = group.expressionProperties || {};
      group.hideExpression = (model, formState, field) => {
        const key = get(field, '_keyPath.path');

        if (!isArray(key)) {
          return false;
        }

        return get(this.options, 'hidden', []).indexOf(key.join('.')) > -1;
      },
      group.expressionProperties['templateOptions.disabled'] = 'formState.disabled';
      if (group.fieldGroup) {
        this.applyTemplateOptions(group.fieldGroup);
      }
    }
    return fieldGroup;
  }

  ngOnChanges(changes) {
    if (changes.formId) {
      this.httpClient.get(`forms/${this.formId}`).subscribe((result: any) => {
        this.showForm = true;
        const schema = result.data.attributes.schema;
        const fieldConfig = this.formlyJsonschema.toFieldConfig(schema);
        this.fields = this.applyTemplateOptions([fieldConfig]);
        this.formName = result.data.attributes.name;
      }, (err: any) => {
        err.error.errors.forEach(err => {
          this.snackBar.open(err.title, 'OK', {
            duration: 3000
          });
        });
      });
    }

    if (changes.readOnly) {
      this.options.formState = { disabled: changes.readOnly.currentValue };
    }
  }

}

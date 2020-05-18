import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormApiService } from '../form-api.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { set } from 'lodash';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {

  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions;
  schema: any;
  name: string;
  mode: string;
  model: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public formApiService: FormApiService,
              private formlyJsonschema: FormlyJsonschema) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;

      if (id) {
        this.mode = 'edit';
        this.formApiService.getForm(id).subscribe((res: any) => {
          this.schema = JSON.stringify(res.data.attributes.schema, null, '    ');
          this.name = res.data.attributes.name;
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  generatePreview() {
    try {
      const schema = JSON.parse(this.schema);
      const fieldConfig = this.formlyJsonschema.toFieldConfig(schema);
      this.fields = [fieldConfig];
      this.options = {};
      set(this.options, 'allowCreateInline', false);
    } catch (err) {
      console.log(err);
    }
  }

  cancelFormEdit() {
    const formId = this.activatedRoute.snapshot.params.id;
    let route;

    if (formId) {
      route = ['../..'];
    } else {
      route = ['..'];
    }

    this.router.navigate(route, {
      relativeTo: this.activatedRoute
    });
  }

  save() {
    if (this.mode === 'create') {
      this.saveNewForm();
    } else {
      this.saveEdits();
    }
  }

  saveNewForm() {
    try {
      let schemaObject = JSON.parse(this.schema);

      this.formApiService.createForm(this.name, schemaObject).subscribe((res: any) => {
        console.log(res);
        this.router.navigate(['..'], {
          relativeTo: this.activatedRoute
        });
      }, err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }

  saveEdits() {
    const formId = this.activatedRoute.snapshot.params.id;

    try {
      let schemaObject = JSON.parse(this.schema);

      this.formApiService.updateForm(formId, {
        name: this.name,
        schema: schemaObject
      }).subscribe((res: any) => {
        this.router.navigate(['../..'], {
          relativeTo: this.activatedRoute
        });
      }, (err: any) => {
        err.error.errors.forEach(err => {
          this.snackBar.open(err.title, 'OK', {
            duration: 5000
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

}

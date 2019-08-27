import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormApiService } from '../form-api.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {

  schema: any;
  name: string;
  mode: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formApiService: FormApiService) { }

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
        console.log(res);
        this.router.navigate(['../..'], {
          relativeTo: this.activatedRoute
        });
      }, err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }

}

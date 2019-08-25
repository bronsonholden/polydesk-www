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

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private formApiService: FormApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;

      this.formApiService.getForm(id).subscribe(res => {
        this.schema = JSON.stringify(res.data.attributes.schema, null, '    ');
      });
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

  saveEdits() {
    const formId = this.activatedRoute.snapshot.params.id;

    let schemaObject;

    try {
      schemaObject = JSON.parse(this.schema);
      this.formApiService.updateForm(formId, {
        schema: schemaObject
      }).subscribe(res => {
        console.log(res);
        this.router.navigate(['../..'], {
          relativeTo: this.activatedRoute
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

}

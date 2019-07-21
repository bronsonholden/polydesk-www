import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {

  schema: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
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

}

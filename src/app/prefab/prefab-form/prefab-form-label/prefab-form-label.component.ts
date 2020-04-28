import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'app-prefab-form-label',
  templateUrl: './prefab-form-label.component.html',
  styleUrls: ['./prefab-form-label.component.scss']
})
export class PrefabFormLabelComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  get text(): any {
    return (<any>this.field).text;
  }

}

import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'app-prefab-form-row',
  templateUrl: './prefab-form-row.component.html',
  styleUrls: ['./prefab-form-row.component.scss']
})
export class PrefabFormRowComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}

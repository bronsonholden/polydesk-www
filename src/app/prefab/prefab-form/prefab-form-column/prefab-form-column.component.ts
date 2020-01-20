import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'app-prefab-form-column',
  templateUrl: './prefab-form-column.component.html',
  styleUrls: ['./prefab-form-column.component.scss']
})
export class PrefabFormColumnComponent extends FieldType implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}

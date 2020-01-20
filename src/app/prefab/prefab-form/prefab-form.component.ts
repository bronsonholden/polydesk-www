import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

import { merge } from 'lodash';

@Component({
  selector: 'app-prefab-form',
  templateUrl: './prefab-form.component.html',
  styleUrls: ['./prefab-form.component.scss']
})
export class PrefabFormComponent implements OnInit {

  @Input() schema: any;
  @Input() model: any;
  @Input() options: any;
  @Input() view: any;
  @Output() modelChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}

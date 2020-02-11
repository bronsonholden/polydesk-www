import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prefab-form-container',
  templateUrl: './prefab-form-container.component.html',
  styleUrls: ['./prefab-form-container.component.scss']
})
export class PrefabFormContainerComponent implements OnInit {

  @Input() model: any = {};
  @Output() modelChange = new EventEmitter<any>();
  @Input() layout: any = [];
  @Input() options: any;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.layout && !changes.layout.firstChange) {
      this.fields = [Object.assign({}, this.layout)];
    }
  }

}

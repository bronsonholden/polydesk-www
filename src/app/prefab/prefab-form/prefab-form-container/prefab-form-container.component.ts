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

  _model: any = {};
  _initialModelChange = true;

  constructor() { }

  ngOnInit() {
    Object.assign(this._model, this.model);

    // Not sure how best to do this. This is done so that changes to the bound
    // model (_model property for this component) are ignored until each
    // Formly field has a chance to insert its initial value (undefined) at
    // each key. Causes ExpressionChangedAfterItHasBeenCheckedError errors
    // otherwise.
    setTimeout(() => {
      this._initialModelChange = false;
    }, 100);
  }

  ngOnChanges(changes) {
    if (changes.layout && !changes.layout.firstChange) {
      this.fields = [Object.assign({}, this.layout)];
    }
  }

  _modelChange(model) {
    // Don't emit the first event which is emitted as soon as the model
    // (_model property for this component) is bound to the FormlyForm
    // component.
    if (!this._initialModelChange) {
      this.modelChange.emit(model);
    }
  }

}

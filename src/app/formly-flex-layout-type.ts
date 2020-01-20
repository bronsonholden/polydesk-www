import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-form-flex',
  template: `
    <div
      style="width: 100%;"
      [fxLayout]="to.fxLayout"
      fxFlexFill>
        <div
            fxShow
            [style.padding-left]="'4px'"
            [style.padding-right]="'4px'"
            [style.min-height]="f.templateOptions.height"
            [style.max-height]="f.templateOptions.height"
            *ngFor="let f of field.fieldGroup"
            [fxFlex]="f.templateOptions.fxFlex">
          <formly-field [field]="f">
          </formly-field>
        </div>
    </div>
  `,
})
export class FormlyFlexLayoutType extends FieldType {
}

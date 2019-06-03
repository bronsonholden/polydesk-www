import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-form-flex',
  template: `
    <div
      class="content"
      [fxLayout]="to.fxLayout"
      [fxLayoutGap]="to.fxLayoutGap"
      fxLayout.xs="column"
      fxFlexFill>
        <div
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

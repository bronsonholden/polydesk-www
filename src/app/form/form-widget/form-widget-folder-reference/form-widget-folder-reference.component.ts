import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { SelectDialogService } from '../../../select-dialog.service';

@Component({
  selector: 'app-form-widget-folder-reference',
  templateUrl: './form-widget-folder-reference.component.html',
  styleUrls: ['./form-widget-folder-reference.component.scss']
})
export class FormWidgetFolderReferenceComponent extends FieldType implements OnInit {
  folder: any = null;

  constructor(private selectDialogService: SelectDialogService) {
    super();
  }

  ngOnInit() { }

  selectFolder() {
    this.selectDialogService.selectFolder({
      autoFocus: false,
      width: '800px',
      height: '600px'
    }).subscribe((result: any) => {
      // Must pick a folder
      if (typeof(result) === 'undefined' || result === 0) {
        return;
      }

      this.folder = result[0];
      this.formControl.setValue(this.folder.id);
    });
  }

  clearFolder() {
    this.folder = null;
    this.formControl.setValue(null);
  }
}

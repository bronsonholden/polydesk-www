import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-form-widget-folder-reference',
  templateUrl: './form-widget-folder-reference.component.html',
  styleUrls: ['./form-widget-folder-reference.component.scss']
})
export class FormWidgetFolderReferenceComponent extends FieldType implements OnInit {
  ngOnInit() {
  }
}

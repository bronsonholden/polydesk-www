import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FormSubmissionApiService } from '../../form-submission-api.service';

@Component({
  selector: 'app-form-submission-select',
  templateUrl: './form-submission-select.component.html',
  styleUrls: ['./form-submission-select.component.scss']
})
export class FormSubmissionSelectComponent implements OnInit {

  data: any = {
    resource: 'form-submissions',
    select: 'single',
    columns: {
      id: {
        title: 'ID',
        display: 'text',
        type: 'id'
      },
      key: {
        title: 'Key',
        display: 'text',
        type: 'json',
        value: 'data'
      },
      createdAt: {
        title: 'Created At',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'created-at'
      }
    },
    display: [
      {
        name: 'id',
        minWidth: 60,
        maxWidth: 60,
        resizeable: false
      },
      {
        name: 'key'
      },
      {
        name: 'createdAt'
      }
    ]
  };

  selection: any = [];
  filter: any = {};
  page: any = {};
  sort: any;
  rows: any = [];

  showTable = false;

  constructor(private formSubmissionApiService: FormSubmissionApiService,
              public dialogRef: MatDialogRef<FormSubmissionSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.dialogRef.afterOpened().subscribe(() => {
      this.showTable = true;
    });
  }

  ngOnInit() {
    this.filter = Object.assign({}, this.dialogData.filters || {});
    this.filter['form-id'] = this.dialogData.formId;
    this.data.columns.key.value = this.dialogData.selectKey;
  }

  cancelSelection() {
    this.dialogRef.close();
  }

  selectFormSubmission() {
    this.dialogRef.close(this.selection[0]);
  }

  isAnyFormSubmissionSelected() {
    return this.selection.length !== 0;
  }

}

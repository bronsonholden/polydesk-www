import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  filters: any = {};
  page: any = {};
  sort: any;
  rows: any = [];

  constructor(private formSubmissionApiService: FormSubmissionApiService,
              public dialogRef: MatDialogRef<FormSubmissionSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
    this.filters = Object.assign({}, this.dialogData.filters || {});
    this.filters['form-id'] = this.dialogData.formId;
    this.data.columns.key.value = this.dialogData.selectKey;
  }

  sortChange(sort) {

  }

  pageChange(page) {
    if (!isNaN(page.offset) && page.offset !== this.page.offset) {
      this.page.offset = page.offset;
    }

    if (!isNaN(page.limit) && page.limit !== this.page.limit) {
      this.page.limit = page.limit;
    }

    this.formSubmissionApiService.index(page.offset || 0, page.limit || 25, this.sort, this.filters).subscribe((res: any) => {
      this.rows = res.data;
      this.page = {
        offset: res.meta['page-offset'],
        limit: res.meta['page-limit'],
        total: res.meta['item-count']
      };
    }, err => {
      console.log(err);
    });
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

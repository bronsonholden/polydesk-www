import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableComponent } from '../../data-table/data-table.component';

@Component({
  selector: 'app-form-submission-select-form-submissions',
  templateUrl: './form-submission-select-form-submissions.component.html',
  styleUrls: ['./form-submission-select-form-submissions.component.scss']
})
export class FormSubmissionSelectFormSubmissionsComponent implements OnInit {

  @ViewChild('selectFormSubmissionsDataTable') selectFormSubmissionsDataTable: DataTableComponent;

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

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.data.resource = `forms/${params.id}/form-submissions`;
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.setSelectKey(params.select);
    });
  }

  setSelectKey(key) {
    this.data.columns.key.value = key;
  }

}

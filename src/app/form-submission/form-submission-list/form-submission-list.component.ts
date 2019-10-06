import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FormApiService } from '../../form-api.service';
import { FormSubmissionApiService } from '../../form-submission-api.service';

import { get, merge } from 'lodash';

@Component({
  selector: 'app-form-submission-list',
  templateUrl: './form-submission-list.component.html',
  styleUrls: ['./form-submission-list.component.scss']
})
export class FormSubmissionListComponent implements OnInit {

  @ViewChild('formSubmissionDataTable') formSubmissionDataTable: DataTableComponent;

  data: any;
  _defaultData = {
    resource: 'form-submissions',
    select: 'multiple',
    columns: {
      id: {
        title: 'ID',
        display: 'link',
        type: 'id',
        pathPrefix: '../../../form-submissions',
        link: {
          type: 'id'
        }
      },
      createdAt: {
        title: 'Created',
        display: 'date',
        type: 'attribute',
        value: 'created-at'
      }
    },
    display: [
      {
        name: 'id',
        width: 120,
        sortable: true
      },
      {
        name: 'createdAt',
        width: 180,
        sortable: true
      }
    ]
  };

  selection: any = [];
  scope: any = {};
  filter: any = {};
  query: any = {};

  constructor(private route: ActivatedRoute,
              private formApiService: FormApiService,
              public formSubmissionApiService: FormSubmissionApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const formId = params.id;

      this.scope['form-id'] = formId;

      this.formApiService.getForm(formId).subscribe((res: any) => {
        const submissionView = get(res.data.attributes, 'schema.options.submissionView');

        if (submissionView) {
          this.data = submissionView;
        } else {
          this.data = this._defaultData;
        }

        this.query = get(res.data.attributes, 'schema.options.queryParams');
      });
    });
  }

}

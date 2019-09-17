import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FormSubmissionApiService } from '../../form-submission-api.service';

import { merge } from 'lodash';

@Component({
  selector: 'app-form-submission-list',
  templateUrl: './form-submission-list.component.html',
  styleUrls: ['./form-submission-list.component.scss']
})
export class FormSubmissionListComponent implements OnInit {

  @ViewChild('formSubmissionDataTable') formSubmissionDataTable: DataTableComponent;

  data = {
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

  filter: any = {};
  selection: any = [];
  scope: any = {};

  constructor(private route: ActivatedRoute,
              private formSubmissionApiService: FormSubmissionApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.filter['form-id'] = params.id;

      // TODO: Get around this by passing a scope to index (as optional last
      // argument) that is always merged into filter before retrieving new
      // resources. Use for filters that cannot be disabled, like scoping to
      // submissions for this particular form.
      this.scope = {
        index: (offset, limit, sort, filter) => {
          return this.formSubmissionApiService.index(offset, limit, sort, merge(filter, this.filter));
        }
      };
    });
  }

}

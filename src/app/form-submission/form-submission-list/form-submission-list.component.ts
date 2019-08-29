import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableComponent } from '../../data-table/data-table.component';

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
      }
    },
    display: [
      {
        name: 'id',
        width: 180
      }
    ]
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data.resource = `forms/${params.id}/form-submissions`;
    });
  }

}

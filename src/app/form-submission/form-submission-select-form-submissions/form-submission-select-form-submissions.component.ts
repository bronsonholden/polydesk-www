import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableComponent } from '../../data-table/data-table.component';

@Component({
  selector: 'app-form-submission-select-form-submissions',
  templateUrl: './form-submission-select-form-submissions.component.html',
  styleUrls: ['./form-submission-select-form-submissions.component.scss']
})
export class FormSubmissionSelectFormSubmissionsComponent implements OnInit {

  @ViewChild('selectFormSubmissionsDataTable') selectFormSubmissionsDataTable: DataTableComponent;

  constructor() { }

  ngOnInit() {
  }

}

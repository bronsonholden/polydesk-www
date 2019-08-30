import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../data-table/data-table.component';

@Component({
  selector: 'app-form-submission-select',
  templateUrl: './form-submission-select.component.html',
  styleUrls: ['./form-submission-select.component.scss']
})
export class FormSubmissionSelectComponent implements OnInit {

  private selectFormSubmissionsDataTable: DataTableComponent;
  private formSubmissionSelectFormSubmissions: any;

  constructor() { }

  ngOnInit() {
  }

  onRouterOutletActivate(formSubmissionSelectFormSubmissions) {
    this.selectFormSubmissionsDataTable = formSubmissionSelectFormSubmissions.selectFormSubmissionsDataTable;
    this.formSubmissionSelectFormSubmissions = formSubmissionSelectFormSubmissions;
  }

}

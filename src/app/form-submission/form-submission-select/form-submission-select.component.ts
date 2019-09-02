import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataTableComponent } from '../../data-table/data-table.component';

@Component({
  selector: 'app-form-submission-select',
  templateUrl: './form-submission-select.component.html',
  styleUrls: ['./form-submission-select.component.scss']
})
export class FormSubmissionSelectComponent implements OnInit {

  private selectFormSubmissionsDataTable: DataTableComponent;
  private formSubmissionSelectFormSubmissions: any;

  constructor(public dialogRef: MatDialogRef<FormSubmissionSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
  }

  onRouterOutletActivate(formSubmissionSelectFormSubmissions) {
    this.selectFormSubmissionsDataTable = formSubmissionSelectFormSubmissions.selectFormSubmissionsDataTable;
    this.formSubmissionSelectFormSubmissions = formSubmissionSelectFormSubmissions;
  }

  cancelSelection() {
    this.dialogRef.close();
  }

  selectFormSubmission() {
    this.dialogRef.close(this.selectFormSubmissionsDataTable.selected[0]);
  }

  isAnyFormSubmissionSelected() {
    return this.selectFormSubmissionsDataTable && this.selectFormSubmissionsDataTable.selected.length !== 0;
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-form-confirm-delete',
  templateUrl: './form-confirm-delete.component.html',
  styleUrls: ['./form-confirm-delete.component.scss']
})
export class FormConfirmDeleteComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<FormConfirmDeleteComponent>,
                @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
  }

  describeSelection() {
    return `${this.dialogData.length} form${this.dialogData.length > 1 ? 's' : ''}`;
  }

  finalDeleteConfirmation() {
    this.dialogRef.close(true);
  }

  closeDeleteDialog() {
    this.dialogRef.close(false);
  }

}

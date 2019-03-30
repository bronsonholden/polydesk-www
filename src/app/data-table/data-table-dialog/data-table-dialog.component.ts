import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-data-table-dialog',
  templateUrl: './data-table-dialog.component.html',
  styleUrls: ['./data-table-dialog.component.scss']
})
export class DataTableDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DataTableDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}

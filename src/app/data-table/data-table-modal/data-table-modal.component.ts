import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataTableComponent } from '../data-table.component';

@Component({
  selector: 'app-data-table-modal',
  templateUrl: './data-table-modal.component.html',
  styleUrls: ['./data-table-modal.component.scss']
})
export class DataTableModalComponent implements OnInit {

  @ViewChild('dataTable') dataTable: DataTableComponent;
  data: any = {};

  constructor(public dialogRef: MatDialogRef<DataTableModalComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.data = dialogData;
  }

  ngOnInit() {
    this.dataTable.reload(this.data);
  }

}

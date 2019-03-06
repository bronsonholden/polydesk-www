import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CreateFolderData {
  name: string;
}

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateFolderComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CreateFolderData) { }

  ngOnInit() {
  }

}

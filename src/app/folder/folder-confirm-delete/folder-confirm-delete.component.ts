import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-folder-confirm-delete',
  templateUrl: './folder-confirm-delete.component.html',
  styleUrls: ['./folder-confirm-delete.component.scss']
})
export class FolderConfirmDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FolderConfirmDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit() {
  }

  closeDeleteDialog() {
    this.dialogRef.close(false);
  }

  describeSelection() {
    let folders = this.dialogData.filter(obj => obj.type === 'folders').length;
    let documents = this.dialogData.filter(obj => obj.type === 'documents').length;
    let description = '';

    if (folders > 0) {
      description += `${folders} folder${folders > 1 ? 's' : ''}`;
    }

    if (documents > 0) {
      description += `${folders > 0 ? ' and ' : ''}${documents} document${documents > 1 ? 's' : ''}`;
    }

    return description;
  }

  finalDeleteConfirmation() {
    this.dialogRef.close(true);
  }

}

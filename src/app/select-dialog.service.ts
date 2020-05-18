import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FolderSelectComponent } from './folder/folder-select/folder-select.component';
import { FormSubmissionSelectComponent } from './form-submission/form-submission-select/form-submission-select.component';

import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SelectDialogService {
  constructor(private router: Router,
              private dialog: MatDialog) {
  }

  selectFolder(dialogOpts) {
    let subject = new Subject();

    const dialogRef = this.dialog.open(FolderSelectComponent, dialogOpts);

    dialogRef.afterClosed().subscribe(result => {
      subject.next(result);
    });

    return subject;
  }

  selectFormSubmission(dialogOpts) {
    return this.dialog.open(FormSubmissionSelectComponent, dialogOpts).afterClosed();
  }
}

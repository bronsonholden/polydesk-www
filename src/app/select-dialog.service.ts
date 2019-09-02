import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { FolderSelectComponent } from './folder/folder-select/folder-select.component';
import { FormSubmissionSelectComponent } from './form-submission/form-submission-select/form-submission-select.component';

@Injectable({
  providedIn: 'root'
})
export class SelectDialogService {
  constructor(private router: Router,
              private dialog: MatDialog) {
  }

  selectFolder(dialogOpts) {
    let subject = new Subject();

    this.router.navigate([
      {
        outlets: {
          'select-dialog-outlet': ['folders', '0']
        }
      }
    ], {
      skipLocationChange: true
    }).then(() => {
      const dialogRef = this.dialog.open(FolderSelectComponent, dialogOpts);

      dialogRef.afterClosed().subscribe(result => {
        // Navigate select dialog outlet away
        this.router.navigate([
          {
            outlets: {
              'select-dialog-outlet': null
            }
          }
        ], {
          skipLocationChange: true
        }).then(() => {
          subject.next(result);
        });
      });
    });

    return subject;
  }

  selectFormSubmission(formId, dialogOpts) {
    let subject = new Subject();

    this.router.navigate([
      {
        outlets: {
          'select-dialog-outlet': ['forms', formId, 'form-submissions']
        }
      }
    ], {
      skipLocationChange: true,
      queryParams: {
        select: dialogOpts.selectKey
      },
      queryParamsHandling: 'merge'
    }).then(() => {
      const dialogRef = this.dialog.open(FormSubmissionSelectComponent, dialogOpts);

      dialogRef.afterClosed().subscribe(result => {
        // Navigate select dialog outlet away
        this.router.navigate([
          {
            outlets: {
              'select-dialog-outlet': null
            }
          }
        ], {
          skipLocationChange: true,
          queryParams: {
            select: null
          },
          queryParamsHandling: 'merge'
        }).then(() => {
          subject.next(result);
        });
      });
    });

    return subject;
  }
}

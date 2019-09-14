import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
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

  resolveFilterOperand(data, filter) {
    switch (filter.operand.type) {
      case 'field':
        return get(data, filter.operand.value);
      case 'constant':
        return filter.operand.value;
    }
  }

  selectFormSubmission(formId, dialogOpts) {
    let subject = new Subject();

    const baseQueryParams = {
      select: dialogOpts.selectKey
    };

    const queryParams = dialogOpts.filters.reduce((q, filter) => {
      q[`filter[${filter.attribute}]`] = `${filter.operator}:${this.resolveFilterOperand(dialogOpts.data, filter)}`;
      return q;
    }, baseQueryParams);

    this.router.navigate([
      {
        outlets: {
          'select-dialog-outlet': ['forms', formId, 'form-submissions']
        }
      }
    ], {
      skipLocationChange: true,
      queryParams: queryParams,
      queryParamsHandling: 'replace'
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
          queryParams: {},
          queryParamsHandling: 'replace'
        }).then(() => {
          subject.next(result);
        });
      });
    });

    return subject;
  }
}

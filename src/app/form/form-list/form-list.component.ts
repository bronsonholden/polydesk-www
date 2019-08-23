import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { from, forkJoin } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FormConfirmDeleteComponent } from '../../form-confirm-delete/form-confirm-delete.component';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  @ViewChild('formDataTable') formDataTable: DataTableComponent;

  data = {
    resource: 'forms',
    select: 'multiple',
    columns: {
      id: {
        title: 'ID',
        display: 'text',
        type: 'id'
      },
      name: {
        title: 'Name',
        display: 'link',
        type: 'id',
        link: {
          display: 'text',
          type: 'attribute',
          value: 'name'
        }
      },
      createdAt: {
        title: 'Created',
        display: 'date',
        type: 'attribute',
        value: 'created-at'
      },
      submissions: {
        title: 'Submissions',
        display: 'link',
        type: 'concat',
        value: {
          separator: '/',
          parts: [
            {
              type: 'id'
            },
            {
              type: 'literal',
              value: 'form-submissions'
            }
          ]
        },
        link: {
          display: 'text',
          type: 'literal',
          value: 'View Submissions'
        }
      }
    },
    display: [
      {
        name: 'name',
        width: 300
      },
      {
        name: 'createdAt',
        width: 180
      },
      {
        name: 'submissions',
        width: 200
      }
    ]
  };

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }

  isFormSelectionEmpty() {
    return this.formDataTable.selected.length === 0;
  }

  deleteRequestFor(form) {
    return this.httpClient.delete(form.links.self);
  }

  deleteSelectedForms() {
    if (this.isFormSelectionEmpty()) {
      return this.snackBar.open('Nothing selected!', 'OK', {
        duration: 3000
      });
    }

    const dialogRef = this.dialog.open(FormConfirmDeleteComponent, {
      autoFocus: false,
      data: this.formDataTable.selected
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const selected = this.formDataTable.selected;
      // TODO: May be better as a component (to show progress for larger
      // deletions).
      const snackBarRef = this.snackBar.open('Deleting...', null, {
        duration: 0
      });

      forkJoin(from(selected).pipe(concatMap(item => this.deleteRequestFor(item)))).subscribe(result => {
        // In case deletion is quick...
        setTimeout(() => { snackBarRef.dismiss() }, 350);
        this.formDataTable.reload();
      });
    });
  }

}

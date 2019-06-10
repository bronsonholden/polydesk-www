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
        type: 'attribute',
        value: 'name'
      },
      createdAt: {
        title: 'Created At',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'created_at'
      },
      updatedAt: {
        name: 'updated_at',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
        title: 'Updated At',
        type: 'attribute',
        value: 'updated_at'
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
        name: 'updatedAt',
        width: 180
      }
    ]
  };

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }

  deleteRequestFor(form) {
    return this.httpClient.delete(form.links.self);
  }

  deleteSelectedForms() {
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

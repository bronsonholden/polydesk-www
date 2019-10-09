import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { from, forkJoin } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FormConfirmDeleteComponent } from '../../form-confirm-delete/form-confirm-delete.component';
import { FormApiService } from '../../form-api.service';

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
        type: 'concat',
        value: {
          separator: '/',
          parts: [
            {
              type: 'literal',
              value: 'forms'
            },
            {
              type: 'id'
            }
          ]
        },
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
              type: 'literal',
              value: 'forms'
            },
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
        width: 300,
        sortable: true
      },
      {
        name: 'createdAt',
        width: 180,
        sortable: true
      },
      {
        name: 'submissions',
        width: 200
      }
    ]
  };

  selection: any = [];

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              public formApiService: FormApiService,
              private router: Router) { }

  pageChange(page) {
    // Initial page has no defined limit or offset.
    if (isNaN(page.offset) || isNaN(page.limit)) {
      return;
    }

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {
        offset: page.offset,
        limit: page.limit
      },
      queryParamsHandling: 'merge'
    });
  }

  filterChange(filters) {
    console.log(filters);
  }

  sortChange(sorting) {
    console.log(sorting);
  }

  ngOnInit() {
  }

  isSingleFormSelected() {
    return this.selection.length === 1;
  }

  isFormSelectionEmpty() {
    return this.selection.length === 0;
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
      data: this.selection
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const selected = this.selection;
      // TODO: May be better as a component (to show progress for larger
      // deletions).
      const snackBarRef = this.snackBar.open('Deleting...', null, {
        duration: 0
      });

      forkJoin(from(selected).pipe(concatMap(item => this.deleteRequestFor(item)))).subscribe(result => {
        // In case deletion is quick...
        setTimeout(() => { snackBarRef.dismiss() }, 350);
      });
    });
  }

  editSelectedForm() {
    let form = this.selection[0];
    this.router.navigate([form.id, 'edit'], {
      relativeTo: this.route
    });
  }

}

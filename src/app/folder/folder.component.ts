import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AngularTokenService } from 'angular-token';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from, forkJoin } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';
import { CreateFolderComponent, CreateFolderData } from './create-folder/create-folder.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { FolderConfirmDeleteComponent } from './folder-confirm-delete/folder-confirm-delete.component';

export class ContentElement {
  constructor(public id: number,
              public name: string,
              public type: string,
              public content_type: string) { }

  get path(): string {
    if (this.type === 'folder') {
      return `${this.type}/${this.id}`;
    } else if (this.type === 'document') {
      return `${this.id}`;
    }
  }

  get icon(): string {
    if (this.type === 'folder') {
      return 'folder-outline';
    } else {
      if (this.content_type === 'application/pdf') {
        return 'file-pdf-outline';
      } else {
        return 'file-document-outline';
      }
    }
  }
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @ViewChild('folderDataTable') folderDataTable: DataTableComponent;

  data = {
    resource: 'content',
    select: 'multiple',
    columns: {
      id: {
        title: 'ID',
        display: 'text',
        type: 'id'
      },
      type: {
        title: 'Type',
        display: 'switch',
        type: 'type',
        case: {
          folder: {
            display: 'icon',
            type: 'literal',
            value: 'folder-outline'
          },
          document: {
            display: 'switch',
            type: 'attribute',
            value: 'content_type',
            case: {
              'application/pdf': {
                display: 'icon',
                type: 'literal',
                value: 'file-pdf-outline'
              }
            },
            default: {
              display: 'icon',
              type: 'literal',
              value: 'file-outline'
            }
          }
        }
      },
      name: {
        title: 'Name',
        display: 'switch',
        type: 'type',
        case: {
          folder: {
            display: 'link',
            pathPrefix: '..',
            type: 'attribute',
            value: 'name'
          },
          document: {
            display: 'link',
            pathPrefix: '../../documents',
            type: 'attribute',
            value: 'name'
          }
        }
      },
      createdAt: {
        title: 'Created',
        display: 'date',
        type: 'attribute',
        value: 'created_at'
      },
      updatedAt: {
        title: 'Updated',
        display: 'date',
        type: 'attribute',
        value: 'updated_at'
      }
    },
    display: [
      {
        name: 'type',
        minWidth: 60,
        maxWidth: 60,
        resizeable: false
      },
      {
        name: 'name',
        width: 400
      },
      {
        name: 'createdAt'
      }
    ]
  };

  constructor(private http: HttpClient,
              private tokenService: AngularTokenService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  openCreateFolderDialog() {
    const dialogRef = this.dialog.open(CreateFolderComponent, {
      data: {
        name: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      let folderId = this.route.snapshot.params.folder;
      let path;

      if (folderId) {
        path = `folders/${folderId}/folders`;
      } else {
        path = `folders`;
      }

      this.http.post(path, {
        name: result
      }).subscribe(res => {
        this.folderDataTable.reload();
      }, (result: any) => {
        result.error.errors.forEach(err => {
          this.snackBar.open(err.title, 'OK', {
            duration: 3000
          });
        });
      });
    });
  }

  pathFor(doc) {
    if (this.route.snapshot.params.folder) {
      return `../../${doc.path}`;
    } else {
      return doc.path;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let folder = params.folder;

      if (folder) {
        this.data.resource = `folders/${folder}/content`;
      } else {
        this.data.resource = 'content'
      }

      this.folderDataTable.reload(this.data);
    })
  }

  isSelectionEmpty(): boolean {
    return this.folderDataTable.selected.length === 0;
  }

  deleteRequestFor(item) {
    return this.http.delete(item.links.self);
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(FolderConfirmDeleteComponent, {
      autoFocus: false,
      data: this.folderDataTable.selected
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const selected = this.folderDataTable.selected;
      // TODO: May be better as a component (to show progress for larger
      // deletions).
      const snackBarRef = this.snackBar.open('Deleting...', null, {
        duration: 0
      });

      forkJoin(from(selected).pipe(concatMap(item => this.deleteRequestFor(item)))).subscribe(result => {
        // In case deletion is quick...
        setTimeout(() => { snackBarRef.dismiss() }, 350);
        this.folderDataTable.reload();
      });
    });
  }

  routeToUpload() {
    this.router.navigate(['./upload'], {
      relativeTo: this.route
    });
  }

}

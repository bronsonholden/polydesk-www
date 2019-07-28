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
import { FolderApiService } from '../folder-api.service';
import { SelectDialogService } from '../select-dialog.service';

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
      if (this['content-type'] === 'application/pdf') {
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
  folderId: string;

  data = {
    resource: 'content',
    select: 'multiple',
    columns: {
      id: {
        title: 'ID',
        display: 'text',
        type: 'id'
      },
      locked: {
        title: 'Lock',
        display: 'switch',
        type: 'attribute',
        value: 'owner',
        case: {
          null: {
            display: 'text',
            type: 'literal',
            value: ''
          }
        },
        default: {
          display: 'icon',
          type: 'literal',
          value: 'lock-outline',
          tooltip: {
            format: 'Checked out by $1',
            args: [
              {
                type: 'attribute',
                value: 'owner'
              }
            ]
          }
        }
      },
      type: {
        title: 'Type',
        display: 'switch',
        type: 'type',
        case: {
          folders: {
            display: 'icon',
            type: 'literal',
            value: 'folder-outline',
            tooltip: 'A folder'
          },
          documents: {
            display: 'switch',
            type: 'attribute',
            value: 'content-type',
            case: {
              'application/pdf': {
                display: 'icon',
                type: 'literal',
                value: 'file-pdf-outline',
                tooltip: 'An Adobe PDF'
              },
              'image/png': {
                display: 'icon',
                type: 'literal',
                value: 'file-image-outline',
                tooltip: 'A PNG image'
              },
              'image/gif': {
                display: 'icon',
                type: 'literal',
                value: 'file-image-outline',
                tooltip: 'A GIF image'
              },
              'image/jpeg': {
                display: 'icon',
                type: 'literal',
                value: 'file-image-outline',
                tooltip: 'A JPEG image'
              },
              'image/bmp': {
                display: 'icon',
                type: 'literal',
                value: 'file-image-outline',
                tooltip: 'A BMP image'
              },
              'image/tiff': {
                display: 'icon',
                type: 'literal',
                value: 'file-image-outline',
                tooltip: 'A TIFF image'
              }
            },
            default: {
              display: 'icon',
              type: 'literal',
              value: 'file-outline',
              tooltip: 'A file'
            }
          }
        }
      },
      name: {
        title: 'Name',
        display: 'switch',
        type: 'type',
        case: {
          folders: {
            display: 'link',
            pathPrefix: '..',
            type: 'attribute',
            value: 'name'
          },
          documents: {
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
        value: 'created-at'
      },
      updatedAt: {
        title: 'Updated',
        display: 'date',
        type: 'attribute',
        value: 'updated-at'
      }
    },
    display: [
      {
        name: 'locked',
        minWidth: 60,
        maxWidth: 60,
        resizeable: false
      },
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
              private folderApi: FolderApiService,
              private selectDialogService: SelectDialogService,
              private tokenService: AngularTokenService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  openMoveToFolderDialog() {
    if (this.isSelectionEmpty()) {
      return this.snackBar.open('Nothing selected!', 'OK', {
        duration: 3000
      });
    }

    this.selectDialogService.selectFolder({
      autoFocus: false,
      width: '800px',
      height: '600px'
    }).subscribe((result: any) => {
      if (typeof(result) === 'undefined') {
        return;
      }

      let id = null;

      if (result !== 0) {
        id = result[0].id;
      }

      const selected = this.folderDataTable.selected;

      const snackBarRef = this.snackBar.open('Move items...', null, {
        duration: 0
      });

      forkJoin(from(selected).pipe(concatMap(item => this.moveRequestFor(item, id)))).subscribe(result => {
        // In case deletion is quick...
        setTimeout(() => { snackBarRef.dismiss() }, 350);
        this.folderDataTable.reload();
      });
    });
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

      const folderId = this.route.snapshot.params.folder;

      let data = {
        type: 'folders',
        attributes: {
          name: result
        }
      };

      if (folderId) {
        data['relationships'] = {
          folder: {
            data: {
              type: 'folders',
              id: `${folderId}`
            }
          }
        }
      }

      this.http.post('folders', {
        data: data
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
      this.folderId = params.folder;

      if (this.folderId) {
        this.data.resource = `folders/${this.folderId}/content`;
      } else {
        this.data.resource = 'content'
      }

      this.folderDataTable.setData(this.data);
    })
  }

  isSelectionEmpty(): boolean {
    return this.folderDataTable.selected.length === 0;
  }

  deleteRequestFor(item) {
    return this.http.delete(item.links.self);
  }

  moveRequestFor(item, folderId) {
    let newFolder = null;

    if (folderId) {
      newFolder = {
        data: {
          id: `${folderId}`,
          type: 'folders'
        }
      };
    }

    return this.http.patch(item.links.self, {
      data: {
        id: `${item.id}`,
        type: `${item.type}`,
        relationships: {
          folder: newFolder
        }
      }
    });
  }

  confirmDelete() {
    if (this.isSelectionEmpty()) {
      return this.snackBar.open('Nothing selected!', 'OK', {
        duration: 3000
      });
    }

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

  goToRoot() {
    if (this.folderId) {
      this.router.navigate(['..'], {
        relativeTo: this.route
      });
    } else {
      this.router.navigate(['.'], {
        relativeTo: this.route
      });
    }
  }

  goToParentFolder() {
    if (!this.folderId) {
      return;
    }

    this.folderApi.getParentFolder(this.folderId).subscribe((result: any) => {
      if (!result.data) {
        this.goToRoot();
      } else {
        this.router.navigate(['..', result.data.id], {
          relativeTo: this.route
        });
      }
    }, (err: any) => {
      err.error.errors.forEach(err => {
        this.snackBar.open(err.title, 'OK', {
          duration: 3000
        });
      });
    });
  }

}

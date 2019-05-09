import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel, CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { AngularTokenService } from 'angular-token';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs/operators';
import { CreateFolderComponent, CreateFolderData } from './create-folder/create-folder.component';

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

  data = {
    resource: 'content',
    selectable: true,
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
        title: 'Updated At',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'updated_at'
      }
    },
    display: [
      {
        name: 'type',
        width: 40
      },
      {
        name: 'name'
      },
      {
        name: 'createdAt',
        width: 150
      }
    ]
  }

  constructor(private http: HttpClient,
              private tokenService: AngularTokenService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

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

      let accountIdentifier = this.route.snapshot.parent.parent.params.account;
      let folderId = this.route.snapshot.params.folder;
      let path;

      if (folderId) {
        path = `${this.tokenService.tokenOptions.apiBase}/${accountIdentifier}/folders/${folderId}/folders`;
      } else {
        path = `${this.tokenService.tokenOptions.apiBase}/${accountIdentifier}/folders`;
      }

      this.http.post(path, {
        name: result
      }).subscribe(res => {
        this.loadFolderContents();
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
  }

}

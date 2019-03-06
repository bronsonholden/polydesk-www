import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel, CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { Angular2TokenService } from 'angular2-token';
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

  data: ContentElement[] = [];
  documentList: MatTableDataSource<ContentElement>;
  selection = new SelectionModel<ContentElement>(true, []);

  displayedColumns = [
    'select',
    'icon',
    'name'
  ];

  constructor(private tokenService: Angular2TokenService,
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
      let accountIdentifier = this.route.snapshot.parent.parent.params.account;
      let folderId = this.route.snapshot.params.folder;
      let path;

      if (folderId) {
        path = `/${accountIdentifier}/folders/${folderId}/folders`;
      } else {
        path = `/${accountIdentifier}/folders`
      }

      this.tokenService.post(path, {
        name: result
      }).subscribe(res => {
        this.loadFolderContents();
      }, res => {
        res.json().errors.forEach(err => {
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

  loadFolderContents() {
    this.data = [];

    let accountIdentifier = this.route.snapshot.parent.parent.params.account;
    let folderId = this.route.snapshot.params.folder;
    let foldersRequestPath;
    let documentsRequestPath;

    if (folderId) {
      foldersRequestPath = `/${accountIdentifier}/folders/${folderId}/folders`;
      documentsRequestPath = `/${accountIdentifier}/folders/${folderId}/documents`;
    } else {
      foldersRequestPath = `/${accountIdentifier}/folders?root=true`;
      documentsRequestPath = `/${accountIdentifier}/documents?root=true`;
    }

    let folderSource = this.tokenService.get(foldersRequestPath);
    let documentSource = this.tokenService.get(documentsRequestPath);
    let source = folderSource.pipe(concat(documentSource));

    source.subscribe(res => {
      this.data = this.data.concat(res.json().data.map(element => new ContentElement(element.id, element.attributes.name, element.type, element.attributes.content_type)));
      this.documentList = new MatTableDataSource<ContentElement>(this.data);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadFolderContents();
    });
  }

  /* Check if all rows in the document list are selected */
  isAllSelected() {
    return this.selection.selected.length === this.documentList.data.length;
  }

  selectAll() {
    this.documentList.data.forEach(row => this.selection.select(row));
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.selectAll();
  }

}

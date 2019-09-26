import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FolderApiService } from '../../folder-api.service';

@Component({
  selector: 'app-folder-select',
  templateUrl: './folder-select.component.html',
  styleUrls: ['./folder-select.component.scss']
})
export class FolderSelectComponent implements OnInit {

  data: any = {
    select: 'single',
    columns: {
      id: {
        title: 'ID',
        display: 'text',
        type: 'id'
      },
      type: {
        title: 'Type',
        display: 'icon',
        type: 'literal',
        value: 'folder-outline'
      },
      name: {
        title: 'Name',
        display: 'link',
        type: 'id',
        pseudoLink: true,
        pathPrefix: 'folders',
        link: {
          display: 'text',
          type: 'attribute',
          value: 'name'
        }
      },
      createdAt: {
        title: 'Created At',
        display: 'date',
        // format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'created-at'
      },
      updatedAt: {
        title: 'Updated At',
        display: 'date',
        // format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'updated-at'
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
        sortable: true
      },
      {
        name: 'createdAt',
        sortable: true
      }
    ]
  };

  selection: any = [];
  filter: any = {
    'folder-id': 0
  };
  page: any = {};
  sort: any = [];
  rows: any = [];
  scope: any = {};

  showTable = false;

  constructor(public dialogRef: MatDialogRef<FolderSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private router: Router,
              private folderApiService: FolderApiService) { }

  ngOnInit() {
    // Add table to DOM only after modal is opened. ngx-datatable will
    // calculate height only on resizes, so we need the modal to be fully
    // open before we add it, so it will fill its container.
    this.dialogRef.afterOpened().subscribe(() => {
      this.showTable = true;
    });
  }

  goToRoot() {
    this.filter = { 'folder-id': 0 };
  }

  folderClicked(folder) {
    console.log(folder);
    this.filter = { 'folder-id': folder.id };
  }

  goToParentFolder() {
    const folderId = this.filter['folder-id'];

    if (folderId === 0) {
      return;
    }

    this.folderApiService.getParentFolder(folderId).subscribe((res: any) => {
      let id = 0;

      if (res.data) {
        id = res.data.id;
      }

      this.filter = { 'folder-id': id };
    }, err => {
      console.log(err);
    });
  }

  atRootFolder() {
    return this.filter['folder-id'] === 0;
  }

  selectFolders() {
    this.dialogRef.close(this.selection[0]);
  }

  cancelSelection() {
    this.dialogRef.close();
  }

  selectRoot() {
    this.dialogRef.close(0)
  }

  isAnyFolderSelected() {
    return this.selection.length > 0;
  }

}

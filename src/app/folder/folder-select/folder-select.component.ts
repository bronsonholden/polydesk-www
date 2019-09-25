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
        format: 'MM/DD/YYYY hh:mm A',
        type: 'attribute',
        value: 'created-at'
      },
      updatedAt: {
        title: 'Updated At',
        display: 'date',
        format: 'MM/DD/YYYY hh:mm A',
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
        name: 'name'
      },
      {
        name: 'createdAt'
      }
    ]
  };

  selection: any = [];
  filters: any = {
    'folder-id': 0
  };
  page: any = {};
  sort: any;
  rows: any = [];

  constructor(public dialogRef: MatDialogRef<FolderSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private router: Router,
              private folderApiService: FolderApiService) { }

  ngOnInit() {
  }

  reload() {
    this.folderApiService.index(this.page.offset || 0, this.page.limit || 25, this.sort, this.filters).subscribe((res: any) => {
      this.rows = res.data;
      this.page = {
        offset: res.meta['page-offset'],
        limit: res.meta['page-limit'],
        total: res.meta['item-count']
      };
    }, err => {
      console.log(err);
    });
  }

  pageChange(page) {
    if (!isNaN(page.offset) && page.offset !== this.page.offset) {
      this.page.offset = page.offset;
    }

    if (!isNaN(page.limit) && page.limit !== this.page.limit) {
      this.page.limit = page.limit;
    }

    this.reload();
  }

  sortChange(sort) {

  }

  goToRoot() {
    this.filters['folder-id'] = 0;
    this.reload();
  }

  folderClicked(folder) {
    this.filters['folder-id'] = folder.id;
    this.reload();
  }

  goToParentFolder() {
    const folderId = this.filters['folder-id'];

    if (folderId === 0) {
      return;
    }

    this.folderApiService.getParentFolder(folderId).subscribe((res: any) => {
      let id = 0;

      if (res.data) {
        id = res.data.id;
      }

      this.filters['folder-id'] = id;
      this.reload();
    }, err => {
      console.log(err);
    });
  }

  atRootFolder() {
    return this.filters['folder-id'] === 0;
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

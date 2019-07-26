import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableComponent } from '../../data-table/data-table.component';

@Component({
  selector: 'app-folder-select-folders',
  templateUrl: './folder-select-folders.component.html',
  styleUrls: ['./folder-select-folders.component.scss']
})
// TODO: Better name for this and FolderSelect components...
export class FolderSelectFoldersComponent implements OnInit {

  data: any = {
    resource: 'folders',
    select: 'single',
    params: {
      'filter[folder-id]': '0'
    },
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
        type: 'attribute',
        pseudoLink: true,
        value: 'name'
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

  folderId: string = '0';

  @ViewChild('selectFolderDataTable') selectFolderDataTable: DataTableComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.goToFolder(params.id);
    });
  }

  goToFolder(folderId) {
    if (typeof folderId !== 'undefined' && folderId !== '0') {
      this.data.params = { 'filter[folder-id]': folderId };
      this.folderId = folderId;
    } else {
      this.data.params = { 'filter[folder-id]': '0' };
      this.folderId = null;
    }

    this.selectFolderDataTable.reload(this.data);
  }

}

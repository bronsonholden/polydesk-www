import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DataTableComponent } from '../../data-table/data-table.component';

@Component({
  selector: 'app-folder-select-folders',
  templateUrl: './folder-select-folders.component.html',
  styleUrls: ['./folder-select-folders.component.scss']
})
// TODO: Better name for this and FolderSelect components...
export class FolderSelectFoldersComponent implements OnInit {

  data = {
    resource: 'folders',
    selectable: true,
    // TODO: Move this out of data config, make an input for the DataTable
    // component instead.
    outlet: 'select-dialog-outlet',
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
          }
        }
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

  @ViewChild('selectFolderDataTable') selectFolderDataTable: DataTableComponent;

  constructor(public dialogRef: MatDialogRef<FolderSelectFoldersComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params.id;

      if (typeof id !== 'undefined' && id !== '0') {
        this.data.resource = `folders/${id}/folders`;
      } else {
        this.data.resource = 'folders?root=true';
      }

      this.selectFolderDataTable.reload(this.data);
    });
  }

}

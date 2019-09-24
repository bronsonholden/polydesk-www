import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableComponent } from '../../data-table/data-table.component';
import { FolderApiService } from '../../folder-api.service';

@Component({
  selector: 'app-folder-select-folders',
  templateUrl: './folder-select-folders.component.html',
  styleUrls: ['./folder-select-folders.component.scss']
})
// TODO: Better name for this and FolderSelect components...
export class FolderSelectFoldersComponent implements OnInit {

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

  filter: any = {};
  folderId: any;

  constructor(private route: ActivatedRoute,
              private folderApiService: FolderApiService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.folderId = params.id;
      this.filter = {
        'folder-id': params.id
      };
    });
  }

}

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

  data = {};

  filter: any = {};
  folderId: any;

  constructor(private route: ActivatedRoute,
              public folderApiService: FolderApiService,
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

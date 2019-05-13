import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { DataTableComponent } from '../../data-table/data-table.component';

@Component({
  selector: 'app-folder-select',
  templateUrl: './folder-select.component.html',
  styleUrls: ['./folder-select.component.scss']
})
export class FolderSelectComponent implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  private selectFoldersDataTable: DataTableComponent;

  constructor(public dialogRef: MatDialogRef<FolderSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private router: Router) { }

  ngOnInit() { }

  onRouterOutletActivate(folderSelectFolders) {
    this.selectFoldersDataTable = folderSelectFolders.selectFolderDataTable;
  }

  selectFolders() {
    this.dialogRef.close(this.selectFoldersDataTable.selected);
  }

  cancelSelection() {
    this.dialogRef.close();
  }

}

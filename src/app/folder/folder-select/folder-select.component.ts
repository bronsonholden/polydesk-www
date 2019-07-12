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
  private folderSelectFolders: any;
  private allowSelectRoot: any;

  constructor(public dialogRef: MatDialogRef<FolderSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: any,
              private router: Router) {
    this.allowSelectRoot = dialogData.allowSelectRoot;
  }

  ngOnInit() {
  }

  goToRoot() {
    this.folderSelectFolders.goToFolder();
  }

  goToParentFolder() {
    // TODO
  }

  canSelectRoot() {
    return this.allowSelectRoot;
  }

  atRootFolder() {
    if (this.folderSelectFolders && this.folderSelectFolders.folderId) {
      return false;
    } else {
      return true;
    }
  }

  onRouterOutletActivate(folderSelectFolders) {
    this.selectFoldersDataTable = folderSelectFolders.selectFolderDataTable;
    this.folderSelectFolders = folderSelectFolders;
  }

  selectFolders() {
    this.dialogRef.close(this.selectFoldersDataTable.selected);
  }

  cancelSelection() {
    this.dialogRef.close();
  }

  selectRoot() {
    this.dialogRef.close(0)
  }

  isAnyFolderSelected() {
    return this.selectFoldersDataTable && this.selectFoldersDataTable.selected.length === 1;
  }

}

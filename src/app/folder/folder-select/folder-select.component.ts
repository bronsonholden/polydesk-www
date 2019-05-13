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

  ngOnInit() {
    // Deactivate the outlet manually. Since the router-outlet will be in
    // a modal, it gets removed before the outlet can deactivate. If that
    // happens, routing will break once the outlet is activated again.
    let sub = this.router.events.subscribe(event => {
      if (event instanceof ActivationStart && event.snapshot.outlet === 'select-dialog-outlet') {
        this.outlet.deactivate();
        sub.unsubscribe();
      }
    });
  }

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

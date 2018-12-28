import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-topbar-actions',
  templateUrl: './topbar-actions.component.html',
  styleUrls: ['./topbar-actions.component.scss']
})
export class TopbarActionsComponent {

  email: string;
  password: string;

  constructor(public dialog: MatDialog) { }

  openDialog(mode): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '400px',
      data: {
        mode: mode,
        email: this.email,
        password: this.password
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

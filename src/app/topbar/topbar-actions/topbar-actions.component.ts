import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-topbar-actions',
  templateUrl: './topbar-actions.component.html',
  styleUrls: ['./topbar-actions.component.scss']
})
export class TopbarActionsComponent {
  constructor(public dialog: MatDialog, public tokenService: Angular2TokenService) { }

  openDialog(mode): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '400px',
      data: {
        mode: mode
      }
    });
  }

  logOut() {
    this.tokenService.signOut();
  }

}

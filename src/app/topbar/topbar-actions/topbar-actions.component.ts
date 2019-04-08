import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-topbar-actions',
  templateUrl: './topbar-actions.component.html',
  styleUrls: ['./topbar-actions.component.scss']
})
export class TopbarActionsComponent {
  constructor(public dialog: MatDialog, public tokenService: AngularTokenService, private router: Router) { }

  openDialog(mode): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '400px',
      data: {
        mode: mode
      }
    });
  }

  logOut() {
    this.tokenService.signOut().subscribe(res => {
      this.router.navigateByUrl('/');
    });
  }

}

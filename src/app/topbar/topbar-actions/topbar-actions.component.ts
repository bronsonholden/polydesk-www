import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthDialogComponent } from '../../auth-dialog/auth-dialog.component';
import { AngularTokenService } from 'angular-token';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-topbar-actions',
  templateUrl: './topbar-actions.component.html',
  styleUrls: ['./topbar-actions.component.scss']
})
export class TopbarActionsComponent {
  constructor(public dialog: MatDialog,
              public tokenService: AngularTokenService,
              private accountService: AccountService,
              private router: Router) { }

  openDialog(mode): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '400px',
      data: {
        mode: mode
      }
    });
  }

  logOut() {
    this.tokenService.signOut().subscribe((res: any) => {
      this.router.navigateByUrl('/');
    });
  }

  goToAccountsList() {
    this.router.navigateByUrl('/accounts');
  }

  selectAccountLabel() {
    if (typeof this.accountService.account === 'string') {
      return 'Switch Account';
    } else {
      return 'Select Account';
    }
  }

  showSwitchAccounts() {
    return this.tokenService.userSignedIn() && this.router.url !== '/accounts';
  }

}

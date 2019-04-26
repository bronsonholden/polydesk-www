import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

export interface AuthData {
  mode: string;
  login: string;
  password: string;
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthData,
    private tokenService: AngularTokenService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  onClose() {
    this.dialogRef.close();
  }

  logIn(e) {
    this.tokenService.signIn(e).subscribe(res => {
      this.dialogRef.close();
      // Redirect to dashboard for default account
      // IMPORTANT: If user doesn't have a default account set (e.g. deleted),
      // this will break.
      this.router.navigateByUrl(`${res.body.data.attributes.default_account}/dashboard`);
    }, result => {
      this.snackBar.open(result.error.errors[0], 'OK', {
        duration: 3000
      });
    });
  }

  signUp(e) {
    this.tokenService.registerAccount(e).subscribe(result => {
      this.dialogRef.close();
    }, result => {
      this.snackBar.open(result.error.errors[0], 'OK', {
        duration: 3000
      });
    });
  }

  switchToLogIn(e) {
    this.data.mode = 'login';
  }

  switchToSignUp(e) {
    this.data.mode = 'signup';
  }

}

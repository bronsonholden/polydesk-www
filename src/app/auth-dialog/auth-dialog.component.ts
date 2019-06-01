import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { AccountService } from '../account.service';

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
    private http: HttpClient,
    private tokenService: AngularTokenService,
    private snackBar: MatSnackBar,
    private router: Router,
    private accountService: AccountService) { }

  onClose() {
    this.dialogRef.close();
  }

  logIn(e) {
    this.tokenService.signIn(e).subscribe(res => {
      this.dialogRef.close();
      // Redirect to dashboard for default account
      // IMPORTANT: If user doesn't have a default account set (e.g. deleted),
      // this will break.
      // TODO: Default account
      // this.accountService.account = res.body.data.attributes.default_account;
      // this.router.navigateByUrl(`${this.accountService.account}/dashboard`);
    }, result => {
      this.snackBar.open(result.error.errors[0], 'OK', {
        duration: 3000
      });
    });
  }

  signUp(e) {
    let data = {
      type: 'users',
      attributes: {
        first_name: e.firstName,
        last_name: e.lastName,
        email: e.email,
        password: e.password,
        password_confirmation: e.passwordConfirmation
      }
    };

    this.http.post('users', {
      data: data
    }).subscribe(result => {
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

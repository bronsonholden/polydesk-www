import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Angular2TokenService } from 'angular2-token';

export interface AuthData {
  mode: string;
  email: string;
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
    private tokenService: Angular2TokenService,
    private snackBar: MatSnackBar) { }

  onClose() {
    this.dialogRef.close();
  }

  logIn(e) {
    this.tokenService.signIn(e).subscribe(result => {
      this.dialogRef.close();
    }, result => {
      this.snackBar.open(result.json().errors[0], 'OK', {
        duration: 3000
      });
    });
  }

  signUp(e) {
    this.tokenService.registerAccount(e).subscribe(result => {
      this.dialogRef.close();
    }, result => {
      this.snackBar.open(result.json().errors[0], 'OK', {
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

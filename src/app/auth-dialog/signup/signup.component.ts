import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  accountName: string;
  accountIdentifier: string;
  userName: string;
  login: string;
  password: string;
  passwordConfirmation: string;

  @Output() signUp: EventEmitter<any> = new EventEmitter();
  @Output() switchToLogIn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitSignUp() {
    this.signUp.emit({
      account_name: this.accountName,
      account_identifier: this.accountIdentifier,
      user_name: this.userName,
      user_email: this.login,
      password: this.password,
      password_confirmation: this.passwordConfirmation
    });
  }

  clickLogInInstead() {
    this.switchToLogIn.emit();
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstName: string;
  lastName
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
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.login,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation
    });
  }

  clickLogInInstead() {
    this.switchToLogIn.emit();
  }

}

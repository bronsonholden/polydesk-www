import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;

  @Output() logIn: EventEmitter<any> = new EventEmitter();
  @Output() switchToSignUp: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitLogIn() {
    this.logIn.emit({
      login: this.login,
      password: this.password
    });
  }

  clickSignUpInstead() {
    this.switchToSignUp.emit();
  }

}

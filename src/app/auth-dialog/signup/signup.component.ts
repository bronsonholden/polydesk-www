import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  passwordConfirmation: string;

  @Output() signUp: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitSignUp() {
    this.signUp.emit({
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation
    });
  }

}

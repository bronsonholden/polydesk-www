import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  @Output() logIn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitLogIn() {
    this.logIn.emit({
      email: this.email,
      password: this.password
    });
  }

}

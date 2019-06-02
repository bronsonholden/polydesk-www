import { Component, OnInit } from '@angular/core';

export class AccountModel {
  constructor(public name: string, public identifier: string) { }
};

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

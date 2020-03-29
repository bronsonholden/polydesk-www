import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  tabs = [
    {
      path: 'desk',
      label: 'Desk',
      exact: false
    },
    {
      path: 'dashboard',
      label: 'Dashboard',
      exact: true
    },
    {
      path: 'reports',
      label: 'Reports',
      exact: false
    },
    {
      path: 'workflows',
      label: 'Workflows',
      exact: false
    }
  ];

  constructor(private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              public tokenService: AngularTokenService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.accountService.account = params.account;
    });
  }

}

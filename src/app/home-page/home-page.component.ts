import { Component, OnInit } from '@angular/core';
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
      path: 'folders',
      label: 'Browse',
      exact: false
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
    },
    {
      path: 'forms',
      label: 'Forms',
      exact: false
    }
  ];

  constructor(public tokenService: AngularTokenService) { }

  ngOnInit() {
  }

}

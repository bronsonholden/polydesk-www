import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  tabs = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      exact: true
    },
    {
      path: '/documents',
      label: 'Documents',
      exact: false
    },
    {
      path: '/reports',
      label: 'Reports',
      exact: false
    },
    {
      path: '/workflows',
      label: 'Workflows',
      exact: false
    },
    {
      path: '/forms',
      label: 'Forms',
      exact: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

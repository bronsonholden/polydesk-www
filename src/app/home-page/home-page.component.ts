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
      label: 'Dashboard'
    },
    {
      path: '/documents',
      label: 'Documents'
    },
    {
      path: '/reports',
      label: 'Reports'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

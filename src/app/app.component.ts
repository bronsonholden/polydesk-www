import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'polydesk-www';

  constructor(public tokenService: AngularTokenService) { }
}

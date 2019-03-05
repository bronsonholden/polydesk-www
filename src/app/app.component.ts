import { Component } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'polydesk-www';

  constructor(public tokenService: Angular2TokenService) {
    this.tokenService.init(environment.tokenAuthConfig);
  }
}

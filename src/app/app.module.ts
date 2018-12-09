import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Material components
import {
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TopbarBrandComponent } from './topbar/topbar-brand/topbar-brand.component';
import { TopbarActionsComponent } from './topbar/topbar-actions/topbar-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TopbarBrandComponent,
    TopbarActionsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

// Import Material components
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { TopbarBrandComponent } from './topbar/topbar-brand/topbar-brand.component';
import { TopbarActionsComponent } from './topbar/topbar-actions/topbar-actions.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentComponent } from './document/document.component';
import { DocumentBrowserComponent } from './document/document-browser/document-browser.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'documents',
    component: DocumentBrowserComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TopbarBrandComponent,
    TopbarActionsComponent,
    HomePageComponent,
    DashboardComponent,
    DocumentComponent,
    DocumentBrowserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

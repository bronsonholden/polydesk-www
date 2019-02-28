import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
//import { RouterTabModule } from '@zerohouse/router-tab';
import { RouterTabModule } from './home-page/router-tab/router-tab.module';
import { Angular2TokenService } from 'angular2-token';

// Import Material components
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
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
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginComponent } from './auth-dialog/login/login.component';
import { SignupComponent } from './auth-dialog/signup/signup.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './report/report-list/report-list.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { FormComponent } from './form/form.component';
import { WorkflowListComponent } from './workflow/workflow-list/workflow-list.component';
import { FormListComponent } from './form/form-list/form-list.component';
import { DocumentListComponent } from './document/document-browser/document-list/document-list.component';
import { ResizeColumnDirective } from './resize-column.directive';

const routes: Routes = [
  {
    path: ':account',
    component: HomePageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'documents',
        component: DocumentBrowserComponent,
        children: [
          {
            path: '',
            component: DocumentListComponent
          },
          {
            path: 'folder/:folder',
            component: DocumentListComponent
          }
        ]
      },
      {
        path: 'reports',
        component: ReportListComponent
      },
      {
        path: 'documents/:id',
        component: DocumentComponent
      },
      {
        path: 'workflows',
        component: WorkflowListComponent
      },
      {
        path: 'forms',
        component: FormListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    TopbarBrandComponent,
    TopbarActionsComponent,
    HomePageComponent,
    DashboardComponent,
    DocumentComponent,
    DocumentBrowserComponent,
    DocumentListComponent,
    AuthDialogComponent,
    LoginComponent,
    SignupComponent,
    ReportComponent,
    ReportListComponent,
    WorkflowComponent,
    FormComponent,
    WorkflowListComponent,
    FormListComponent,
    ResizeColumnDirective
  ],
  entryComponents: [
    AuthDialogComponent,
    TopbarActionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTreeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    RouterTabModule
  ],
  providers: [
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}

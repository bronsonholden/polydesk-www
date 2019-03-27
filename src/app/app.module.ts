import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTabModule } from './home-page/router-tab/router-tab.module';
import { AngularTokenService, AngularTokenModule } from 'angular-token';
import { environment } from '../environments/environment';
import { AceEditorModule } from 'ng2-ace-editor';
import { FlexLayoutModule } from '@angular/flex-layout';

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
import { FolderTreeComponent } from './folder-tree/folder-tree.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginComponent } from './auth-dialog/login/login.component';
import { SignupComponent } from './auth-dialog/signup/signup.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './report/report-list/report-list.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { FormComponent } from './form/form.component';
import { WorkflowListComponent } from './workflow/workflow-list/workflow-list.component';
import { FormListComponent } from './form/form-list/form-list.component';
import { FolderComponent } from './folder/folder.component';
import { ResizeColumnDirective } from './resize-column.directive';
import { CreateFolderComponent } from './folder/create-folder/create-folder.component';
import { TextWidgetComponent } from './form/form-widget/widget-library/text-widget/text-widget.component';
import { FormWidgetComponent } from './form/form-widget/form-widget.component';
import { WidgetFactory } from './form/form-widget/widget-library/widget-factory';
import { WidgetRegistry } from './form/form-widget/widget-library/widget-registry';
import { FormSubmissionComponent } from './form-submission/form-submission.component';
import { FormContainerComponent } from './form/form-container/form-container.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DocumentDataTableComponent } from './document-data-table/document-data-table.component';

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
        path: 'dataview',
        component: DocumentDataTableComponent
      },
      {
        path: 'documents',
        component: DocumentBrowserComponent,
        children: [
          {
            path: '',
            component: FolderComponent
          },
          {
            path: 'folder/:folder',
            component: FolderComponent
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
        children: [
          {
            path: '',
            component: FormListComponent,
          },
          {
            path: ':id/submit',
            component: FormSubmissionComponent
          },
          {
            path: ':id/edit',
            component: FormEditComponent
          }
        ]
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
    FolderTreeComponent,
    FolderComponent,
    AuthDialogComponent,
    LoginComponent,
    SignupComponent,
    ReportComponent,
    ReportListComponent,
    WorkflowComponent,
    FormComponent,
    WorkflowListComponent,
    FormListComponent,
    ResizeColumnDirective,
    CreateFolderComponent,
    TextWidgetComponent,
    FormWidgetComponent,
    FormSubmissionComponent,
    FormContainerComponent,
    FormEditComponent,
    DataTableComponent,
    DocumentDataTableComponent
  ],
  entryComponents: [
    AuthDialogComponent,
    CreateFolderComponent,
    TopbarActionsComponent,
    TextWidgetComponent
  ],
  imports: [
    AceEditorModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    AngularTokenModule.forRoot(environment.tokenAuthConfig),
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
    AngularTokenModule,
    WidgetFactory,
    WidgetRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    matIconRegistry.addSvgIcon('folder-open-outline', domSanitizer.bypassSecurityTrustResourceUrl('../assets/folder-open-outline.svg'));
    matIconRegistry.addSvgIcon('file-pdf-outline', domSanitizer.bypassSecurityTrustResourceUrl('../assets/file-pdf-outline.svg'));
  }
}

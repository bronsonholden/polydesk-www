import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTabModule } from './home-page/router-tab/router-tab.module';
import { ApiModule } from './api.module';
import { AngularTokenService, AngularTokenModule } from 'angular-token';
import { environment } from '../environments/environment';
import { AceEditorModule } from 'ng2-ace-editor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyFlexLayoutType } from './formly-flex-layout-type';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { PdfViewerModule } from 'ng2-pdf-viewer';

// Import Material components
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';

import { AccountService } from './account.service';
import { DocumentApiService } from './document-api.service';
import { FolderApiService } from './folder-api.service';
import { FormApiService } from './form-api.service';
import { FormSubmissionApiService } from './form-submission-api.service';
import { SelectDialogService } from './select-dialog.service';
import { JsonAccessorService } from './json-accessor.service';

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
import { FormSubmitComponent } from './form-submit/form-submit.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableCellComponent } from './data-table/data-table-cell/data-table-cell.component';
import { DataTableDialogComponent } from './data-table/data-table-dialog/data-table-dialog.component';
import { ConfirmationsComponent } from './confirmations/confirmations.component';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { FolderSelectComponent } from './folder/folder-select/folder-select.component';
import { FolderSelectFoldersComponent } from './folder/folder-select-folders/folder-select-folders.component';
import { FolderConfirmDeleteComponent } from './folder/folder-confirm-delete/folder-confirm-delete.component';
import { AccountComponent } from './account/account.component';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { FormConfirmDeleteComponent } from './form-confirm-delete/form-confirm-delete.component';
import { FormWidgetObjectComponent } from './form/form-widget/form-widget-object/form-widget-object.component';
import { FormWidgetArrayComponent } from './form/form-widget/form-widget-array/form-widget-array.component';
import { FormWidgetFolderReferenceComponent } from './form/form-widget/form-widget-folder-reference/form-widget-folder-reference.component';
import { FormSubmissionComponent } from './form-submission/form-submission.component';
import { FormSubmissionListComponent } from './form-submission/form-submission-list/form-submission-list.component';
import { FormWidgetFormSubmissionReferenceComponent } from './form/form-widget/form-widget-form-submission-reference/form-widget-form-submission-reference.component';
import { FormSubmissionSelectComponent } from './form-submission/form-submission-select/form-submission-select.component';
import { FormEmbedComponent } from './form/form-embed/form-embed.component';
import { FormWidgetSliderComponent } from './form/form-widget/form-widget-slider/form-widget-slider.component';
import { FormWidgetDatepickerComponent } from './form/form-widget/form-widget-datepicker/form-widget-datepicker.component';
import { DataTableRouteBindingComponent } from './data-table/data-table-route-binding/data-table-route-binding.component';
import { DataTableBindingComponent } from './data-table/data-table-binding/data-table-binding.component';

const routes: Routes = [
  {
    path: 'confirmations/:confirmationToken',
    component: ConfirmationsComponent
  },
  {
    path: 'accounts',
    component: AccountListComponent
  },
  {
    path: ':account',
    component: HomePageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'folders',
        component: DocumentBrowserComponent,
        children: [
          {
            path: '',
            component: FolderComponent
          },
          {
            path: 'upload',
            component: DocumentCreateComponent
          },
          {
            path: ':folder',
            component: FolderComponent
          },
          {
            path: ':folder/upload',
            component: DocumentCreateComponent
          }
        ]
      },
      {
        path: 'reports',
        component: ReportListComponent
      },
      {
        path: 'documents/upload',
        component: DocumentCreateComponent
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
        path: 'form-submissions',
        children: [
          {
            path: '',
            component: WorkflowListComponent // TODO
          },
          {
            path: ':form-submission',
            component: FormSubmissionComponent
          }
        ]
      },
      {
        path: 'forms',
        children: [
          {
            path: '',
            component: FormListComponent,
          },
          {
            path: 'new',
            component: FormEditComponent
          },
          {
            path: ':id',
            component: FormComponent,
          },
          {
            path: ':id/edit',
            component: FormEditComponent
          },
          {
            path: ':id/form-submissions',
            component: FormSubmissionListComponent
          }
        ]
      }
    ]
  },
  {
    path: 'folders/:id',
    component: FolderSelectFoldersComponent,
    outlet: 'select-dialog-outlet'
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
    FormSubmitComponent,
    FormEditComponent,
    DataTableComponent,
    DataTableCellComponent,
    DataTableDialogComponent,
    ConfirmationsComponent,
    DocumentCreateComponent,
    FolderSelectComponent,
    FolderSelectFoldersComponent,
    FolderConfirmDeleteComponent,
    AccountComponent,
    AccountCreateComponent,
    AccountListComponent,
    FormlyFlexLayoutType,
    FormConfirmDeleteComponent,
    FormWidgetObjectComponent,
    FormWidgetArrayComponent,
    FormWidgetFolderReferenceComponent,
    FormSubmissionComponent,
    FormSubmissionListComponent,
    FormWidgetFormSubmissionReferenceComponent,
    FormSubmissionSelectComponent,
    FormEmbedComponent,
    FormWidgetSliderComponent,
    FormWidgetDatepickerComponent,
    DataTableRouteBindingComponent,
    DataTableBindingComponent
  ],
  entryComponents: [
    AccountCreateComponent,
    AuthDialogComponent,
    CreateFolderComponent,
    DataTableDialogComponent,
    FolderConfirmDeleteComponent,
    FolderSelectComponent,
    FormSubmissionSelectComponent,
    FormConfirmDeleteComponent,
    TopbarActionsComponent,
  ],
  imports: [
    AceEditorModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    // ApiModule must be imported befor AngularTokenModule, otherwise
    // AngularTokenInjector will see requests going out to a URL that doesn't
    // start with the configured apiBase and not apply auth headers.
    ApiModule,
    AngularTokenModule.forRoot(environment.tokenAuthConfig),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            }
          }
        },
        { name: 'enum', extends: 'select' },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'object', component: FormWidgetObjectComponent },
        { name: 'array', component: FormWidgetArrayComponent },
        { name: 'polydesk-folder', component: FormWidgetFolderReferenceComponent },
        { name: 'polydesk-form-submission', component: FormWidgetFormSubmissionReferenceComponent },
        { name: 'slider', component: FormWidgetSliderComponent },
        { name: 'datepicker', component: FormWidgetDatepickerComponent }
      ]
    }),
    FormlyMaterialModule,
    FormlyMatSliderModule,
    RouterModule.forRoot(routes),
    RouterTabModule,
    PdfViewerModule
  ],
  providers: [
    AngularTokenModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    matIconRegistry.addSvgIcon('folder-open-outline', domSanitizer.bypassSecurityTrustResourceUrl('../assets/folder-open-outline.svg'));
    matIconRegistry.addSvgIcon('file-pdf-outline', domSanitizer.bypassSecurityTrustResourceUrl('../assets/file-pdf-outline.svg'));
    matIconRegistry.addSvgIcon('file-image-outline', domSanitizer.bypassSecurityTrustResourceUrl('../assets/file-image-outline.svg'));
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInjector } from './api.injector';
import { TokenValidationInjector } from './token-validation.injector';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInjector,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenValidationInjector,
      multi: true
    }
  ]
})
export class ApiModule { }

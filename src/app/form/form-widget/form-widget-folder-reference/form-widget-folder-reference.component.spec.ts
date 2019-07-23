import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetFolderReferenceComponent } from './form-widget-document-reference.component';

describe('FormWidgetFolderReferenceComponent', () => {
  let component: FormWidgetFolderReferenceComponent;
  let fixture: ComponentFixture<FormWidgetFolderReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetFolderReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetFolderReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

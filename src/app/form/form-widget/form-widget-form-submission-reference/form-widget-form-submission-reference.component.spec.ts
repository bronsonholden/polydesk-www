import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetFormSubmissionReferenceComponent } from './form-widget-form-submission-reference.component';

describe('FormWidgetFormSubmissionReferenceComponent', () => {
  let component: FormWidgetFormSubmissionReferenceComponent;
  let fixture: ComponentFixture<FormWidgetFormSubmissionReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetFormSubmissionReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetFormSubmissionReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

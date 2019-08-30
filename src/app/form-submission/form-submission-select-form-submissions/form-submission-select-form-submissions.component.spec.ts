import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionSelectFormSubmissionsComponent } from './form-submission-select-form-submissions.component';

describe('FormSubmissionSelectFormSubmissionsComponent', () => {
  let component: FormSubmissionSelectFormSubmissionsComponent;
  let fixture: ComponentFixture<FormSubmissionSelectFormSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubmissionSelectFormSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmissionSelectFormSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

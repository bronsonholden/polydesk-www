import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionSelectComponent } from './form-submission-select.component';

describe('FormSubmissionSelectComponent', () => {
  let component: FormSubmissionSelectComponent;
  let fixture: ComponentFixture<FormSubmissionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubmissionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmissionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

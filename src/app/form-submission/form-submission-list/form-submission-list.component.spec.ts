import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionListComponent } from './form-submission-list.component';

describe('FormSubmissionListComponent', () => {
  let component: FormSubmissionListComponent;
  let fixture: ComponentFixture<FormSubmissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubmissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

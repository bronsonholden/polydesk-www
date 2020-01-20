import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetInputComponent } from './form-widget-input.component';

describe('FormWidgetInputComponent', () => {
  let component: FormWidgetInputComponent;
  let fixture: ComponentFixture<FormWidgetInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

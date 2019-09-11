import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetDatepickerComponent } from './form-widget-datepicker.component';

describe('FormWidgetDatepickerComponent', () => {
  let component: FormWidgetDatepickerComponent;
  let fixture: ComponentFixture<FormWidgetDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

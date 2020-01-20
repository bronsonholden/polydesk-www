import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetLabelComponent } from './form-widget-label.component';

describe('FormWidgetLabelComponent', () => {
  let component: FormWidgetLabelComponent;
  let fixture: ComponentFixture<FormWidgetLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

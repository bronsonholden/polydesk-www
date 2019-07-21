import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetArrayComponent } from './form-widget-array.component';

describe('FormWidgetArrayComponent', () => {
  let component: FormWidgetArrayComponent;
  let fixture: ComponentFixture<FormWidgetArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

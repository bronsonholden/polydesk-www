import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetObjectComponent } from './form-widget-object.component';

describe('FormWidgetObjectComponent', () => {
  let component: FormWidgetObjectComponent;
  let fixture: ComponentFixture<FormWidgetObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

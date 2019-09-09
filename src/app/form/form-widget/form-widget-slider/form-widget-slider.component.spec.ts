import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetSliderComponent } from './form-widget-slider.component';

describe('FormWidgetSliderComponent', () => {
  let component: FormWidgetSliderComponent;
  let fixture: ComponentFixture<FormWidgetSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

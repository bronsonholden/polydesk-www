import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetMapPolylineWrapperComponent } from './form-widget-map-polyline-wrapper.component';

describe('FormWidgetMapPolylineWrapperComponent', () => {
  let component: FormWidgetMapPolylineWrapperComponent;
  let fixture: ComponentFixture<FormWidgetMapPolylineWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetMapPolylineWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetMapPolylineWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetMapPolylineComponent } from './form-widget-map-polyline.component';

describe('FormWidgetMapPolylineComponent', () => {
  let component: FormWidgetMapPolylineComponent;
  let fixture: ComponentFixture<FormWidgetMapPolylineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetMapPolylineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetMapPolylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

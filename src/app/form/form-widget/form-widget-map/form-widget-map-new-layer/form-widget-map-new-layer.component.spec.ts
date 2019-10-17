import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetMapNewLayerComponent } from './form-widget-map-new-layer.component';

describe('FormWidgetMapNewLayerComponent', () => {
  let component: FormWidgetMapNewLayerComponent;
  let fixture: ComponentFixture<FormWidgetMapNewLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetMapNewLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetMapNewLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetMapPointComponent } from './form-widget-map-point.component';

describe('FormWidgetMapPointComponent', () => {
  let component: FormWidgetMapComponent;
  let fixture: ComponentFixture<FormWidgetMapPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetMapPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetMapPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

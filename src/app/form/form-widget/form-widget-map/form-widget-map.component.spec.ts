import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetMapComponent } from './form-widget-map.component';

describe('FormWidgetMapComponent', () => {
  let component: FormWidgetMapComponent;
  let fixture: ComponentFixture<FormWidgetMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWidgetMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRegistryComponent } from './widget-registry.component';

describe('WidgetRegistryComponent', () => {
  let component: WidgetRegistryComponent;
  let fixture: ComponentFixture<WidgetRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

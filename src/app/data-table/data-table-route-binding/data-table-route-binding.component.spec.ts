import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableRouteBindingComponent } from './data-table-route-binding.component';

describe('DataTableRouteBindingComponent', () => {
  let component: DataTableRouteBindingComponent;
  let fixture: ComponentFixture<DataTableRouteBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableRouteBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableRouteBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

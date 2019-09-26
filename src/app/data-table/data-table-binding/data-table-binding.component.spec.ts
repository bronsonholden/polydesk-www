import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableBindingComponent } from './data-table-binding.component';

describe('DataTableBindingComponent', () => {
  let component: DataTableBindingComponent;
  let fixture: ComponentFixture<DataTableBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

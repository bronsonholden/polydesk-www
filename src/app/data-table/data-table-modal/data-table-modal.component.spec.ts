import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableModalComponent } from './data-table-modal.component';

describe('DataTableModalComponent', () => {
  let component: DataTableModalComponent;
  let fixture: ComponentFixture<DataTableModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

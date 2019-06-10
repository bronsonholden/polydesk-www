import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmDeleteComponent } from './form-confirm-delete.component';

describe('FormConfirmDeleteComponent', () => {
  let component: FormConfirmDeleteComponent;
  let fixture: ComponentFixture<FormConfirmDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormConfirmDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

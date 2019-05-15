import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderConfirmDeleteComponent } from './folder-confirm-delete.component';

describe('FolderConfirmDeleteComponent', () => {
  let component: FolderConfirmDeleteComponent;
  let fixture: ComponentFixture<FolderConfirmDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderConfirmDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

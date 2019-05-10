import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderSelectFoldersComponent } from './folder-select-folders.component';

describe('FolderSelectFoldersComponent', () => {
  let component: FolderSelectFoldersComponent;
  let fixture: ComponentFixture<FolderSelectFoldersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderSelectFoldersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderSelectFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

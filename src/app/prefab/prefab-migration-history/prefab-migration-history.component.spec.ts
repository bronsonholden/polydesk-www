import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabMigrationHistoryComponent } from './prefab-migration-history.component';

describe('PrefabMigrationHistoryComponent', () => {
  let component: PrefabMigrationHistoryComponent;
  let fixture: ComponentFixture<PrefabMigrationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabMigrationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabMigrationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

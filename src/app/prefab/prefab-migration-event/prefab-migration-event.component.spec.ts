import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabMigrationEventComponent } from './prefab-migration-event.component';

describe('PrefabMigrationEventComponent', () => {
  let component: PrefabMigrationEventComponent;
  let fixture: ComponentFixture<PrefabMigrationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabMigrationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabMigrationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintMigrationEditComponent } from './blueprint-migration-edit.component';

describe('BlueprintMigrationEditComponent', () => {
  let component: BlueprintMigrationEditComponent;
  let fixture: ComponentFixture<BlueprintMigrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintMigrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintMigrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

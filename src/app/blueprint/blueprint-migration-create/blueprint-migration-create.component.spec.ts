import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintMigrationCreateComponent } from './blueprint-migration-create.component';

describe('BlueprintMigrationCreateComponent', () => {
  let component: BlueprintMigrationCreateComponent;
  let fixture: ComponentFixture<BlueprintMigrationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintMigrationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintMigrationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

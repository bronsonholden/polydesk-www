import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintMigrationViewComponent } from './blueprint-migration-view.component';

describe('BlueprintMigrationViewComponent', () => {
  let component: BlueprintMigrationViewComponent;
  let fixture: ComponentFixture<BlueprintMigrationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintMigrationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintMigrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

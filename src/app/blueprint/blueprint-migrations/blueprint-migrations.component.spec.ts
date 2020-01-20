import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintMigrationsComponent } from './blueprint-migrations.component';

describe('BlueprintMigrationsComponent', () => {
  let component: BlueprintMigrationsComponent;
  let fixture: ComponentFixture<BlueprintMigrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintMigrationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintMigrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

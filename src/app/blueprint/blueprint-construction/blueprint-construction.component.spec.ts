import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintConstructionComponent } from './blueprint-construction.component';

describe('BlueprintConstructionComponent', () => {
  let component: BlueprintConstructionComponent;
  let fixture: ComponentFixture<BlueprintConstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintConstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

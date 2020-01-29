import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintCreateComponent } from './blueprint-create.component';

describe('BlueprintCreateComponent', () => {
  let component: BlueprintCreateComponent;
  let fixture: ComponentFixture<BlueprintCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

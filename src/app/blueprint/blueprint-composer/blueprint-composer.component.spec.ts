import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintComposerComponent } from './blueprint-composer.component';

describe('BlueprintComposerComponent', () => {
  let component: BlueprintComposerComponent;
  let fixture: ComponentFixture<BlueprintComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintComposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

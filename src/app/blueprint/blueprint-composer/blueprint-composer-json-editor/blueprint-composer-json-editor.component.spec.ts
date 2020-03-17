import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintComposerJsonEditorComponent } from './blueprint-composer-json-editor.component';

describe('BlueprintComposerJsonEditorComponent', () => {
  let component: BlueprintComposerJsonEditorComponent;
  let fixture: ComponentFixture<BlueprintComposerJsonEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueprintComposerJsonEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueprintComposerJsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

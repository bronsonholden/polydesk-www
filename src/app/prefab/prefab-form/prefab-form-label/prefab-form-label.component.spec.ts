import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormLabelComponent } from './prefab-form-label.component';

describe('PrefabFormLabelComponent', () => {
  let component: PrefabFormLabelComponent;
  let fixture: ComponentFixture<PrefabFormLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

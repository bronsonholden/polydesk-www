import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormArrayComponent } from './prefab-form-array.component';

describe('PrefabFormArrayComponent', () => {
  let component: PrefabFormArrayComponent;
  let fixture: ComponentFixture<PrefabFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

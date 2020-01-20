import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormRowComponent } from './prefab-form-row.component';

describe('PrefabFormRowComponent', () => {
  let component: PrefabFormRowComponent;
  let fixture: ComponentFixture<PrefabFormRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

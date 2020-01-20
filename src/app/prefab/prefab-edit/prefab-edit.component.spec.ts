import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabEditComponent } from './prefab-edit.component';

describe('PrefabEditComponent', () => {
  let component: PrefabEditComponent;
  let fixture: ComponentFixture<PrefabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

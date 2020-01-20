import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabComponent } from './prefab.component';

describe('PrefabComponent', () => {
  let component: PrefabComponent;
  let fixture: ComponentFixture<PrefabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

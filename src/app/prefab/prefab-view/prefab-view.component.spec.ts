import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabViewComponent } from './prefab-view.component';

describe('PrefabViewComponent', () => {
  let component: PrefabViewComponent;
  let fixture: ComponentFixture<PrefabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

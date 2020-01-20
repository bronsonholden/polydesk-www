import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormMediaLayerComponent } from './prefab-form-media-layer.component';

describe('PrefabFormMediaLayerComponent', () => {
  let component: PrefabFormMediaLayerComponent;
  let fixture: ComponentFixture<PrefabFormMediaLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormMediaLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormMediaLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

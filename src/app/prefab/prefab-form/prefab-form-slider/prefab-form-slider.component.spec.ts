import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormSliderComponent } from './prefab-form-slider.component';

describe('PrefabFormSliderComponent', () => {
  let component: PrefabFormSliderComponent;
  let fixture: ComponentFixture<PrefabFormSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

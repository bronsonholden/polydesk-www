import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormContainerComponent } from './prefab-form-container.component';

describe('PrefabFormContainerComponent', () => {
  let component: PrefabFormContainerComponent;
  let fixture: ComponentFixture<PrefabFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

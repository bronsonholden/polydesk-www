import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormComponent } from './prefab-form.component';

describe('PrefabFormComponent', () => {
  let component: PrefabFormComponent;
  let fixture: ComponentFixture<PrefabFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

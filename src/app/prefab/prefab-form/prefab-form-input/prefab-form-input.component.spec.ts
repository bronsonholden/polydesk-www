import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormInputComponent } from './prefab-form-input.component';

describe('PrefabFormInputComponent', () => {
  let component: PrefabFormInputComponent;
  let fixture: ComponentFixture<PrefabFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

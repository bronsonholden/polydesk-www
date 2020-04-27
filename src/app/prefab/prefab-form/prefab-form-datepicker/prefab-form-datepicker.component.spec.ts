import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormDatepickerComponent } from './prefab-form-datepicker.component';

describe('PrefabFormDatepickerComponent', () => {
  let component: PrefabFormDatepickerComponent;
  let fixture: ComponentFixture<PrefabFormDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

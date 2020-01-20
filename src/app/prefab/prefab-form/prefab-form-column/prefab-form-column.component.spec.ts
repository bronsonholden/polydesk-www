import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefabFormColumnComponent } from './prefab-form-column.component';

describe('PrefabFormColumnComponent', () => {
  let component: PrefabFormColumnComponent;
  let fixture: ComponentFixture<PrefabFormColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrefabFormColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefabFormColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

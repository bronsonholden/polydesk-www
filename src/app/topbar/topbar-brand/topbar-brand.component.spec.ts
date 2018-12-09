import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarBrandComponent } from './topbar-brand.component';

describe('TopbarBrandComponent', () => {
  let component: TopbarBrandComponent;
  let fixture: ComponentFixture<TopbarBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbarBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWidget } from './text.component';

describe('TextWidget', () => {
  let component: TextWidget;
  let fixture: ComponentFixture<TextWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

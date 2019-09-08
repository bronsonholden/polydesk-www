import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmbedComponent } from './form-embed.component';

describe('FormEmbedComponent', () => {
  let component: FormEmbedComponent;
  let fixture: ComponentFixture<FormEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

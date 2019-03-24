import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDataTableComponent } from './document-data-table.component';

describe('DocumentDataTableComponent', () => {
  let component: DocumentDataTableComponent;
  let fixture: ComponentFixture<DocumentDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

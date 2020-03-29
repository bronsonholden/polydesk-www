import { TestBed } from '@angular/core/testing';

import { ApiErrorService } from './api-error.service';

describe('ApiErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiErrorService = TestBed.get(ApiErrorService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { measureService } from './measure-service';

describe('Service', () => {
  let service: measureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(measureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

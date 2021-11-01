import { TestBed } from '@angular/core/testing';

import { XiteService } from './xite.service';

describe('XiteService', () => {
  let service: XiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

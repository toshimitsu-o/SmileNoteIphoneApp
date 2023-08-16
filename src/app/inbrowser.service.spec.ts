import { TestBed } from '@angular/core/testing';

import { InbrowserService } from './inbrowser.service';

describe('InbrowserService', () => {
  let service: InbrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InbrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

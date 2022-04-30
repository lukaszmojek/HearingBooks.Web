import { TestBed } from '@angular/core/testing';

import { TextSynthesisService } from './text-synthesis.service';

describe('TextSynthesisService', () => {
  let service: TextSynthesisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSynthesisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

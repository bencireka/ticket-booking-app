import { TestBed } from '@angular/core/testing';

import { TheatrePlayService } from './theatre-play.service';

describe('TheatrePlayService', () => {
  let service: TheatrePlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheatrePlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

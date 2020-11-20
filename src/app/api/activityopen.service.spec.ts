import { TestBed } from '@angular/core/testing';

import { ActivityopenService } from './activityopen.service';

describe('ActivityopenService', () => {
  let service: ActivityopenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityopenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

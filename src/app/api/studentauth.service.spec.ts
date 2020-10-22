import { TestBed } from '@angular/core/testing';

import { StudentauthService } from './studentauth.service';

describe('StudentauthService', () => {
  let service: StudentauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

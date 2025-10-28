import { TestBed } from '@angular/core/testing';

import { StaffPlaningService } from './staff-planing-service';

describe('StaffPlaningService', () => {
  let service: StaffPlaningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffPlaningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

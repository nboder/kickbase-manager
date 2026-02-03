import { TestBed } from '@angular/core/testing';
import { CompetitionManagementService } from './competition-management-service';
describe('CompetitionManagementService', () => {
  let service: CompetitionManagementService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetitionManagementService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

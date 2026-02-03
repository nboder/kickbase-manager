import { TestBed } from '@angular/core/testing';
import { LeagueManagementService } from './league-management-service';
describe('LeagueManagementService', () => {
  let service: LeagueManagementService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeagueManagementService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

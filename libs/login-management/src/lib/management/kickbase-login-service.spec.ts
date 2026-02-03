import { TestBed } from '@angular/core/testing';
import { KickbaseLoginService } from './kickbase-login-service';
describe('KickbaseLoginService', () => {
  let service: KickbaseLoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KickbaseLoginService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

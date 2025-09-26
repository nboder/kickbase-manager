import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueManagement } from './LeagueManagement';

describe('LeagueManagement', () => {
  let component: LeagueManagement;
  let fixture: ComponentFixture<LeagueManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

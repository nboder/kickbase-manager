import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueSelection } from './LeagueSelection';

describe('LeagueSelection', () => {
  let component: LeagueSelection;
  let fixture: ComponentFixture<LeagueSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueSelection],
    }).compileComponents();

    fixture = TestBed.createComponent(LeagueSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

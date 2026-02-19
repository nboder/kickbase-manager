import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchdayComponent } from './MatchdayComponent';

describe('Matchday', () => {
  let component: MatchdayComponent;
  let fixture: ComponentFixture<MatchdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchdayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchdayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

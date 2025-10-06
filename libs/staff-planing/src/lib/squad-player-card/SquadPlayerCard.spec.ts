import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquadPlayerCard } from './SquadPlayerCard';

describe('SquadPlayerCard', () => {
  let component: SquadPlayerCard;
  let fixture: ComponentFixture<SquadPlayerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadPlayerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadPlayerCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

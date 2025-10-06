import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerNameAndValue } from './PlayerNameAndValue';

describe('PlayerNameAndValue', () => {
  let component: PlayerNameAndValue;
  let fixture: ComponentFixture<PlayerNameAndValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerNameAndValue],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerNameAndValue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferMarketCard } from './TransferMarketCard';

describe('TransferMarketCard', () => {
  let component: TransferMarketCard;
  let fixture: ComponentFixture<TransferMarketCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferMarketCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferMarketCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

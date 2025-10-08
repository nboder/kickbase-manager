import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferMarketBidDialog } from './TransferMarketBidDialog';

describe('TransferMarketBidDialog', () => {
  let component: TransferMarketBidDialog;
  let fixture: ComponentFixture<TransferMarketBidDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferMarketBidDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferMarketBidDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferMarket } from './transfer-market';
describe('TransferMarket', () => {
  let component: TransferMarket;
  let fixture: ComponentFixture<TransferMarket>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferMarket],
    }).compileComponents();
    fixture = TestBed.createComponent(TransferMarket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

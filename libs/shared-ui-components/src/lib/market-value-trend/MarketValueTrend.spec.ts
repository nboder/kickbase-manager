import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketValueTrend } from './MarketValueTrend';
describe('MarketValueTrend', () => {
  let component: MarketValueTrend;
  let fixture: ComponentFixture<MarketValueTrend>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketValueTrend],
    }).compileComponents();
    fixture = TestBed.createComponent(MarketValueTrend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

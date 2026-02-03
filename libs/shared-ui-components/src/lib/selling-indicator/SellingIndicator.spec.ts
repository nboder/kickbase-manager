import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellingIndicator } from './SellingIndicator';
describe('SellingIndicator', () => {
  let component: SellingIndicator;
  let fixture: ComponentFixture<SellingIndicator>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingIndicator],
    }).compileComponents();
    fixture = TestBed.createComponent(SellingIndicator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

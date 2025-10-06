import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoneyOverview } from './MoneyOverview';

describe('MoneyOverview', () => {
  let component: MoneyOverview;
  let fixture: ComponentFixture<MoneyOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

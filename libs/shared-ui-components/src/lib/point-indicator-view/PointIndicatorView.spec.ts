import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointIndicatorView } from './PointIndicatorView';

describe('BarIndicatorView', () => {
  let component: PointIndicatorView;
  let fixture: ComponentFixture<PointIndicatorView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointIndicatorView],
    }).compileComponents();

    fixture = TestBed.createComponent(PointIndicatorView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

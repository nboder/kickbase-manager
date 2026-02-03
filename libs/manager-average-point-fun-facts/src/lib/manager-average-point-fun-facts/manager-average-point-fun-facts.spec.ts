import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerAveragePointFunFacts } from './manager-average-point-fun-facts';
describe('ManagerAveragePointFunFacts', () => {
  let component: ManagerAveragePointFunFacts;
  let fixture: ComponentFixture<ManagerAveragePointFunFacts>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAveragePointFunFacts],
    }).compileComponents();
    fixture = TestBed.createComponent(ManagerAveragePointFunFacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

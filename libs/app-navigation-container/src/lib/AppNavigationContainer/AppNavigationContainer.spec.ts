import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppNavigationContainer } from './AppNavigationContainer';
describe('AppNavigationContainer', () => {
  let component: AppNavigationContainer;
  let fixture: ComponentFixture<AppNavigationContainer>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppNavigationContainer],
    }).compileComponents();
    fixture = TestBed.createComponent(AppNavigationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

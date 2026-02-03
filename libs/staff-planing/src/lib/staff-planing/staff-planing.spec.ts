import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaffPlaning } from './staff-planing';
describe('StaffPlaning', () => {
  let component: StaffPlaning;
  let fixture: ComponentFixture<StaffPlaning>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffPlaning],
    }).compileComponents();
    fixture = TestBed.createComponent(StaffPlaning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

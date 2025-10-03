import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginManagement } from './LoginManagement';

describe('LoginManagement', () => {
  let component: LoginManagement;
  let fixture: ComponentFixture<LoginManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarNavigation } from './SideBarNavigation';
describe('SideBarNavigation', () => {
  let component: SideBarNavigation;
  let fixture: ComponentFixture<SideBarNavigation>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarNavigation],
    }).compileComponents();
    fixture = TestBed.createComponent(SideBarNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

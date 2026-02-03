import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionManagement } from './CompetitionManagement';

describe('CompetitionManagement', () => {
  let component: CompetitionManagement;
  let fixture: ComponentFixture<CompetitionManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

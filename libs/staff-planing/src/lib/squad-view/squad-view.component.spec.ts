import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquadView } from './squad-view.component';
describe('SquadView', () => {
  let component: SquadView;
  let fixture: ComponentFixture<SquadView>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadView],
    }).compileComponents();
    fixture = TestBed.createComponent(SquadView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

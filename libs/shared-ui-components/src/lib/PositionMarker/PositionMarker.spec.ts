import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PositionMarker } from './PositionMarker';

describe('PositionMarker', () => {
  let component: PositionMarker;
  let fixture: ComponentFixture<PositionMarker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionMarker],
    }).compileComponents();

    fixture = TestBed.createComponent(PositionMarker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

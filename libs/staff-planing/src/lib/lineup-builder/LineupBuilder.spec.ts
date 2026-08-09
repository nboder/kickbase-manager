import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { KickbaseStaffPosition } from '@kickbase/definitions';
import {
  ManagerService,
  StaffPlaningService,
  TransferMarketService,
} from '@kickbase/api-services';
import { FieldSlot, LineupBuilder, LineupPlayer } from './LineupBuilder';

describe('LineupBuilder', () => {
  let component: LineupBuilder;
  let fixture: ComponentFixture<LineupBuilder>;

  const staffPlaningServiceMock = {
    fetchMyTeam: jest.fn().mockReturnValue(of({ it: [] })),
  };
  const transferMarketServiceMock = {
    fetchTransferMarketInformation: jest.fn().mockReturnValue(of({ it: [] })),
  };
  const managerServiceMock = {
    fetchBudgetInformation: jest.fn().mockReturnValue(of({ b: 1_000_000 })),
  };
  const activatedRouteMock = {
    parent: {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('12345'),
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineupBuilder],
      providers: [
        CurrencyPipe,
        { provide: StaffPlaningService, useValue: staffPlaningServiceMock },
        { provide: TransferMarketService, useValue: transferMarketServiceMock },
        { provide: ManagerService, useValue: managerServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LineupBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isLoading()).toBe(false);
    expect(component.budget()).toBe(1_000_000);
  });

  it('should calculate transfer cost and updated balance only for transfer players', () => {
    const squadPlayer: LineupPlayer = {
      id: 'squad-1',
      name: 'Squad Player',
      position: KickbaseStaffPosition.GK,
      marketValue: 1_000_000,
      averagePoints: 0,
      imageUrl: '',
      source: 'squad',
    };
    const transferPlayer: LineupPlayer = {
      id: 'transfer-1',
      name: 'Transfer Player',
      position: KickbaseStaffPosition.FWD,
      marketValue: 5_000_000,
      averagePoints: 0,
      imageUrl: '',
      source: 'transfer',
    };

    component.budget.set(10_000_000);
    component.slots.set([
      { id: 'slot-0', label: 'TW', position: KickbaseStaffPosition.GK, top: 5, left: 50, players: [squadPlayer] },
      { id: 'slot-1', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 10, players: [] },
      { id: 'slot-2', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 37, players: [] },
      { id: 'slot-3', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 63, players: [] },
      { id: 'slot-4', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 90, players: [] },
      { id: 'slot-5', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 10, players: [] },
      { id: 'slot-6', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 37, players: [] },
      { id: 'slot-7', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 63, players: [] },
      { id: 'slot-8', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 90, players: [] },
      { id: 'slot-9', label: 'ST', position: KickbaseStaffPosition.FWD, top: 85, left: 30, players: [transferPlayer] },
      { id: 'slot-10', label: 'ST', position: KickbaseStaffPosition.FWD, top: 85, left: 70, players: [] },
    ] as FieldSlot[]);

    expect(component.filledSlotCount()).toBe(2);
    expect(component.transferCost()).toBe(5_000_000);
    expect(component.updatedBalance()).toBe(5_000_000);
  });

  it('should return a removed field player to the correct source list', () => {
    const transferPlayer: LineupPlayer = {
      id: 'transfer-2',
      name: 'Transfer Player 2',
      position: KickbaseStaffPosition.FWD,
      marketValue: 3_000_000,
      averagePoints: 0,
      imageUrl: '',
      source: 'transfer',
    };

    component.transferPlayers.set([]);
    component.slots.set([
      { id: 'slot-9', label: 'ST', position: KickbaseStaffPosition.FWD, top: 85, left: 30, players: [transferPlayer] },
    ] as FieldSlot[]);

    component.removePlayerFromSlot(component.slots()[0]);

    expect(component.slots()[0].players.length).toBe(0);
    expect(component.transferPlayers().length).toBe(1);
    expect(component.transferPlayers()[0].id).toBe('transfer-2');
  });
});

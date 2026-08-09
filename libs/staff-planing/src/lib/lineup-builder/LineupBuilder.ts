import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';
import {
  AppRouteDefinitions,
  KickbaseApi,
  KickbaseStaffPosition,
  MoneyPipe,
  SquadResponseStaff,
  SquadResponsePlayer,
  MarketInformationResponse,
  MarketInformationPlayerResponse,
  BudgetResponse,
  kickbasePositionFromValue,
} from '@kickbase/definitions';
import {
  ManagerService,
  StaffPlaningService,
  TransferMarketService,
} from '@kickbase/api-services';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { NgClass } from '@angular/common';

export interface LineupPlayer {
  readonly id: string;
  readonly name: string;
  readonly position: KickbaseStaffPosition;
  readonly marketValue: number;
  readonly averagePoints: number;
  readonly imageUrl: string;
  readonly source: 'squad' | 'transfer';
}

export interface FieldSlot {
  readonly id: string;
  readonly label: string;
  readonly position: KickbaseStaffPosition;
  readonly top: number;
  readonly left: number;
  players: LineupPlayer[];
}

function buildFieldSlots(): FieldSlot[] {
  return [
    { id: 'slot-0', label: 'TW', position: KickbaseStaffPosition.GK, top: 5, left: 50, players: [] },
    { id: 'slot-1', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 10, players: [] },
    { id: 'slot-2', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 37, players: [] },
    { id: 'slot-3', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 63, players: [] },
    { id: 'slot-4', label: 'ABW', position: KickbaseStaffPosition.DEF, top: 25, left: 90, players: [] },
    { id: 'slot-5', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 10, players: [] },
    { id: 'slot-6', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 37, players: [] },
    { id: 'slot-7', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 63, players: [] },
    { id: 'slot-8', label: 'MF', position: KickbaseStaffPosition.MID, top: 55, left: 90, players: [] },
    { id: 'slot-9', label: 'ST', position: KickbaseStaffPosition.FWD, top: 85, left: 30, players: [] },
    { id: 'slot-10', label: 'ST', position: KickbaseStaffPosition.FWD, top: 85, left: 70, players: [] },
  ];
}

function toLineupPlayerFromSquad(
  responsePlayer: SquadResponsePlayer
): LineupPlayer {
  return {
    id: responsePlayer.i,
    name: responsePlayer.n,
    position: safeKickbasePosition(responsePlayer.pos),
    marketValue: responsePlayer.mv,
    averagePoints: responsePlayer.ap ?? 0,
    imageUrl: responsePlayer.pim
      ? KickbaseApi.KICKBASE_CONTENT_URL + responsePlayer.pim
      : '',
    source: 'squad',
  };
}

function toLineupPlayerFromTransfer(
  responsePlayer: MarketInformationPlayerResponse
): LineupPlayer {
  return {
    id: responsePlayer.i,
    name: responsePlayer.n,
    position: safeKickbasePosition(responsePlayer.pos),
    marketValue: responsePlayer.mv,
    averagePoints: responsePlayer.ap ?? 0,
    imageUrl: responsePlayer.pim
      ? KickbaseApi.KICKBASE_CONTENT_URL + responsePlayer.pim
      : '',
    source: 'transfer',
  };
}

function safeKickbasePosition(pos: number): KickbaseStaffPosition {
  try {
    return kickbasePositionFromValue(pos);
  } catch {
    return KickbaseStaffPosition.MID;
  }
}

@Component({
  selector: 'lib-lineup-builder',
  standalone: true,
  imports: [
    NgClass,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MoneyPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatDivider,
  ],
  templateUrl: './LineupBuilder.html',
  styleUrl: './LineupBuilder.scss',
})
export class LineupBuilder implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly staffPlaningService = inject(StaffPlaningService);
  private readonly transferMarketService = inject(TransferMarketService);
  private readonly managerService = inject(ManagerService);

  readonly squadPlayers = signal<LineupPlayer[]>([]);
  readonly transferPlayers = signal<LineupPlayer[]>([]);
  readonly slots = signal<FieldSlot[]>(buildFieldSlots());
  readonly budget = signal<number>(0);
  readonly isLoading = signal<boolean>(true);
  readonly selectedLeagueId = signal<string>('');

  readonly filledSlotCount = computed(() => {
    return this.slots().filter((slot) => slot.players.length > 0).length;
  });

  readonly transferCost = computed(() => {
    return this.slots().reduce((sum, slot) => {
      const player = slot.players[0];
      if (player && player.source === 'transfer') {
        return sum + player.marketValue;
      }
      return sum;
    }, 0);
  });

  readonly updatedBalance = computed(() => {
    return this.budget() - this.transferCost();
  });

  readonly allSlotsFilled = computed(() => {
    return this.filledSlotCount() === this.slots().length;
  });

  ngOnInit(): void {
    const leagueId = this.activatedRoute.parent?.snapshot.paramMap.get(
      AppRouteDefinitions.PATH_PARAM_LEAGUE_ID
    );
    if (!leagueId) {
      console.error('No league id provided for lineup builder.');
      this.isLoading.set(false);
      return;
    }

    this.selectedLeagueId.set(leagueId);
    this.loadData(leagueId);
  }

  private loadData(leagueId: string): void {
    this.isLoading.set(true);
    forkJoin({
      squad: this.staffPlaningService.fetchMyTeam(leagueId),
      market: this.transferMarketService.fetchTransferMarketInformation(leagueId),
      budget: this.managerService.fetchBudgetInformation(leagueId),
    }).subscribe({
      next: (result: {
        squad: SquadResponseStaff;
        market: MarketInformationResponse;
        budget: BudgetResponse;
      }) => {
        this.squadPlayers.set(
          result.squad.it
            .map((player) => toLineupPlayerFromSquad(player))
            .sort((a, b) => a.position - b.position)
        );
        this.transferPlayers.set(
          result.market.it
            .map((player) => toLineupPlayerFromTransfer(player))
            .sort((a, b) => a.position - b.position)
        );
        this.budget.set(result.budget.b);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load lineup builder data', err);
        this.isLoading.set(false);
      },
    });
  }

  drop(event: CdkDragDrop<LineupPlayer[]>): void {
    const player = event.item.data as LineupPlayer;
    if (!player) {
      return;
    }

    if (event.previousContainer === event.container) {
      this.handleSameContainerDrop(event);
      return;
    }

    this.removePlayerFromPreviousLocation(player, event.previousContainer);
    this.addPlayerToTarget(player, event.container, event.currentIndex);
  }

  private handleSameContainerDrop(event: CdkDragDrop<LineupPlayer[]>): void {
    const id = event.container.id;
    if (id.startsWith('slot-')) {
      return;
    }

    const newData = [...event.container.data];
    moveItemInArray(newData, event.previousIndex, event.currentIndex);
    if (id === 'squad-list') {
      this.squadPlayers.set(newData);
    } else if (id === 'transfer-list') {
      this.transferPlayers.set(newData);
    }
  }

  private removePlayerFromPreviousLocation(
    player: LineupPlayer,
    container: CdkDropList<LineupPlayer[]>
  ): void {
    const id = container.id;
    if (id === 'squad-list') {
      this.squadPlayers.update((players) =>
        players.filter((p) => p.id !== player.id)
      );
    } else if (id === 'transfer-list') {
      this.transferPlayers.update((players) =>
        players.filter((p) => p.id !== player.id)
      );
    } else if (id.startsWith('slot-')) {
      this.updateSlotPlayers(id, []);
    }
  }

  private addPlayerToTarget(
    player: LineupPlayer,
    container: CdkDropList<LineupPlayer[]>,
    currentIndex: number
  ): void {
    const id = container.id;
    if (id === 'squad-list') {
      this.insertIntoSourceList(this.squadPlayers, player, currentIndex);
    } else if (id === 'transfer-list') {
      this.insertIntoSourceList(this.transferPlayers, player, currentIndex);
    } else if (id.startsWith('slot-')) {
      const slots = [...this.slots()];
      const slot = slots.find((s) => s.id === id);
      if (slot) {
        if (slot.players.length > 0) {
          this.returnPlayerToSource(slot.players[0]);
        }
        slot.players = [player];
        this.slots.set(slots);
      }
    }
  }

  private insertIntoSourceList(
    list: WritableSignal<LineupPlayer[]>,
    player: LineupPlayer,
    index: number
  ): void {
    list.update((players) => {
      const newPlayers = [...players];
      const safeIndex = Math.max(0, Math.min(index, newPlayers.length));
      newPlayers.splice(safeIndex, 0, player);
      return newPlayers.sort((a, b) => a.position - b.position);
    });
  }

  private updateSlotPlayers(slotId: string, players: LineupPlayer[]): void {
    this.slots.update((slots) => {
      return slots.map((slot) => {
        if (slot.id === slotId) {
          return { ...slot, players };
        }
        return slot;
      });
    });
  }

  private returnPlayerToSource(player: LineupPlayer): void {
    if (player.source === 'squad') {
      this.squadPlayers.update((players) =>
        [...players, player].sort((a, b) => a.position - b.position)
      );
    } else {
      this.transferPlayers.update((players) =>
        [...players, player].sort((a, b) => a.position - b.position)
      );
    }
  }

  clearField(): void {
    const slots = [...this.slots()];
    slots.forEach((slot) => {
      if (slot.players.length > 0) {
        this.returnPlayerToSource(slot.players[0]);
        slot.players = [];
      }
    });
    this.slots.set(slots);
  }

  removePlayerFromSlot(slot: FieldSlot): void {
    if (slot.players.length > 0) {
      const player = slot.players[0];
      this.updateSlotPlayers(slot.id, []);
      this.returnPlayerToSource(player);
    }
  }

  protected readonly KickbaseStaffPosition = KickbaseStaffPosition;
  protected readonly kickbasePositionToString = kickbasePositionToString;
}

function kickbasePositionToString(pos: number): string {
  switch (pos) {
    case KickbaseStaffPosition.GK:
      return 'TW';
    case KickbaseStaffPosition.DEF:
      return 'ABW';
    case KickbaseStaffPosition.MID:
      return 'MF';
    case KickbaseStaffPosition.FWD:
      return 'ST';
    default:
      return '?';
  }
}

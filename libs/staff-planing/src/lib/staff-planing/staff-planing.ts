import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { StaffPlaningService } from '../service/staff-planing-service';
import {
  KickbaseLeagueConstants,
  kickbasePositionToString,
  KickbaseStaffPosition,
  MoneyPipe,
  Player,
  SquadResponseStaff,
} from '@kickbase/definitions';
import { CurrencyPipe, NgClass } from '@angular/common';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
  SellingPlayer,
} from '@kickbase/persistence-management';
import { TransferMarket } from '../transfer-market/transfer-market';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MoneyOverview } from '../money-overview/MoneyOverview';

@Component({
  selector: 'lib-staff-planing',
  imports: [NgClass, TransferMarket, MoneyPipe, MatSlideToggle, MoneyOverview],
  providers: [CurrencyPipe],
  templateUrl: './staff-planing.html',
  styleUrls: ['./staff-planing.scss', '../shared.scss'],
})
export class StaffPlaning implements OnInit {
  private readonly storageManager: PersistenceManager = inject(
    LocalStoragePersistenceManager
  );
  private readonly staffService = inject(StaffPlaningService);

  private readonly tfhTrendColumnName = '24h Trend';
  showTfhTrendColumn = signal(false);
  private readonly columns = [
    '#',
    'Position',
    'Name',
    'Market Value',
    this.tfhTrendColumnName,
    'Want to sell?',
  ];

  visibleColumns = computed(() => {
    if (this.showTfhTrendColumn()) {
      return this.columns;
    } else {
      return this.columns.filter((col) => col !== this.tfhTrendColumnName);
    }
  });

  mySquad = signal<Player[]>([]);
  sumOfSoldPlayers = computed(() => {
    const soldPlayer = this.mySquad().filter((mySquadPlayer) =>
      this.storageManager.containedInPlayersToSell(mySquadPlayer.playerId)
    );
    let sumOfSellingPlayers = 0;
    soldPlayer.forEach((player) => {
      sumOfSellingPlayers += player.marketValue;
    });
    return sumOfSellingPlayers;
  });

  sumOfBuyingPlayer = signal<number>(0);

  ngOnInit(): void {
    this.storageManager.loadPlayersToSell();
    this.staffService
      .fetchMyTeam(KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID.toString())
      .subscribe({
        next: (data: SquadResponseStaff) => {
          const players = data.it.map((value) => new Player(value));
          const sortedPlayers = players.sort((a, b) => a.position - b.position);
          this.mySquad.set(sortedPlayers);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  isPlayerMarkForSelling(player: Player): boolean {
    return this.storageManager.containedInPlayersToSell(player.playerId);
  }

  setPlayerAsSellingCandidate(player: Player, event: Event) {
    const element = event.target as HTMLInputElement;
    if (element.checked) {
      this.storageManager.storeSellablePlayer(
        new SellingPlayer(player.playerId)
      );
    } else {
      this.storageManager.removeSellablePlayer(
        new SellingPlayer(player.playerId)
      );
    }
  }

  sellAllPlayersNotInSquad() {
    this.mySquad().forEach((player) => {
      if (!player.isInSquad) {
        this.storageManager.storeSellablePlayer(player);
      }
    });
  }

  resetAllSellingCandidates() {
    this.storageManager.clearAllSellablePlayers();
  }

  positionCssClassName(position: KickbaseStaffPosition): string {
    return 'position__' + kickbasePositionToString(position);
  }

  protected readonly kickbasePositionToString = kickbasePositionToString;
}

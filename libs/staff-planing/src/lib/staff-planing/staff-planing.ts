import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { StaffPlaningService } from '../service/staff-planing-service';
import {
  KickbaseLeagueConstants,
  Player,
  SquadResponseStaff,
} from '@kickbase/definitions';
import { CurrencyPipe } from '@angular/common';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
  SellingPlayer,
} from '@kickbase/persistence-management';
import { TransferMarket } from '../transfer-market/transfer-market';
import { MoneyOverview } from '../money-overview/MoneyOverview';
import { SquadPlayerCard } from '../squad-player-card/SquadPlayerCard';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lib-staff-planing',
  imports: [TransferMarket, MoneyOverview, SquadPlayerCard, MatButton],
  providers: [CurrencyPipe],
  templateUrl: './staff-planing.html',
  styleUrls: ['./staff-planing.scss', '../shared.scss'],
})
export class StaffPlaning implements OnInit {
  private readonly storageManager: PersistenceManager = inject(
    LocalStoragePersistenceManager
  );
  private readonly staffService = inject(StaffPlaningService);

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

  twentyFourHourMarketValuePredictions = computed(() => {
    return this.mySquad()
      .filter((mySquadPlayer) => !this.isPlayerMarkedForSelling(mySquadPlayer))
      .map((value) => value.twentyForHoursDevelopment);
  });

  sevenDayMarketValuePredictions = computed(() => {
    return this.mySquad()
      .filter((mySquadPlayer) => !this.isPlayerMarkedForSelling(mySquadPlayer))
      .map((value) => value.sevenDayPrediction);
  });

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

  isPlayerMarkedForSelling(player: Player): boolean {
    return this.storageManager.containedInPlayersToSell(player.playerId);
  }

  playerToggleSellStatus(playerId: string, shouldBeSold: boolean) {
    if (shouldBeSold) {
      this.storageManager.storeSellablePlayer(new SellingPlayer(playerId));
    } else {
      this.storageManager.removeSellablePlayer(new SellingPlayer(playerId));
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
}

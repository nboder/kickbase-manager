import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SquadPlayerCard } from '../squad-player-card/SquadPlayerCard';
import {
  kickbasePositionToExtendedString,
  Player,
  SquadResponseStaff,
} from '@kickbase/definitions';
import { StaffPlaningService } from '@kickbase/api-services';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
  SellingPlayer,
} from '@kickbase/persistence-management';
import { Divider, DividerSize, ResponsiveView } from '@kickbase/PositionMarker';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'lib-squad-view',
  imports: [MatButton, SquadPlayerCard, NgTemplateOutlet, Divider],
  templateUrl: './squad-view.component.html',
  styleUrl: './squad-view.component.scss',
})
export class SquadView implements OnInit, ResponsiveView {
  selectedLeagueId = input.required<string>();
  showMobileLayout = input<boolean>(false);

  sumOfSoldPlayers = computed(() => {
    const soldPlayer = this.mySquad().filter((mySquadPlayer) =>
      this.storageManager.containedInPlayersToSell(mySquadPlayer.playerId),
    );
    let sumOfSellingPlayers = 0;
    soldPlayer.forEach((player) => {
      sumOfSellingPlayers += player.marketValue;
    });
    return sumOfSellingPlayers;
  });

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

  twentyFourHourMarketValuePredictionsOnlyBenchPlayer = computed(() => {
    return this.mySquad()
      .filter(
        (mySquadPlayer) =>
          !this.isPlayerMarkedForSelling(mySquadPlayer) &&
          !mySquadPlayer.isInSquad,
      )
      .map((value) => value.twentyForHoursDevelopment);
  });

  sevenDayMarketValuePredictionsOnlyBenchPlayer = computed(() => {
    return this.mySquad()
      .filter(
        (mySquadPlayer) =>
          !this.isPlayerMarkedForSelling(mySquadPlayer) &&
          !mySquadPlayer.isInSquad,
      )
      .map((value) => value.sevenDayPrediction);
  });

  private readonly storageManager: PersistenceManager = inject(
    LocalStoragePersistenceManager,
  );
  private readonly staffService = inject(StaffPlaningService);
  mySquad = signal<Player[]>([]);

  ngOnInit(): void {
    this.storageManager.loadPlayersToSell();
    this.staffService.fetchMyTeam(this.selectedLeagueId()).subscribe({
      next: (data: SquadResponseStaff) => {
        const players = data.it.map((value) => {
          const player = Player.playerFromSquadResponsePlayer(value);
          if (player.isOnTransferMarket) {
            this.storageManager.storeSellablePlayer(
              new SellingPlayer(player.playerId),
            );
          }
          return player;
        });
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
        this.storageManager.storeSellablePlayer(
          new SellingPlayer(player.playerId),
        );
      }
    });
  }

  resetAllSellingCandidates() {
    this.mySquad().forEach((player) => {
      if (!player.isOnTransferMarket) {
        this.storageManager.removeSellablePlayer(
          new SellingPlayer(player.playerId),
        );
      }
    });
  }

  shouldShowPositionSeparator(currentIndex: number, isFirst: boolean): boolean {
    if (isFirst) {
      return true;
    } else {
      if (
        this.mySquad()[currentIndex - 1].position !=
        this.mySquad()[currentIndex].position
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  protected readonly kickbasePositionToExtendedString =
    kickbasePositionToExtendedString;
  protected readonly DividerSize = DividerSize;
}

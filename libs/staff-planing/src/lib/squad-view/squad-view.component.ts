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
import { Player, SquadResponseStaff } from '@kickbase/definitions';
import { StaffPlaningService } from '../service/staff-planing-service';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
  SellingPlayer,
} from '@kickbase/persistence-management';
import { ResponsiveView } from '@kickbase/PositionMarker';

@Component({
  selector: 'lib-sqaud-view',
  imports: [MatButton, SquadPlayerCard],
  templateUrl: './squad-view.component.html',
  styleUrl: './squad-view.component.scss',
})
export class SquadView implements OnInit, ResponsiveView {
  selectedLeagueId = input.required<string>();
  showMobileLayout = input<boolean>(false);

  sumOfSOldPlayers = computed(() => {
    const soldPlayer = this.mySquad().filter((mySquadPlayer) =>
      this.storageManager.containedInPlayersToSell(mySquadPlayer.playerId)
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
          !mySquadPlayer.isInSquad
      )
      .map((value) => value.twentyForHoursDevelopment);
  });

  sevenDayMarketValuePredictionsOnlyBenchPlayer = computed(() => {
    return this.mySquad()
      .filter(
        (mySquadPlayer) =>
          !this.isPlayerMarkedForSelling(mySquadPlayer) &&
          !mySquadPlayer.isInSquad
      )
      .map((value) => value.sevenDayPrediction);
  });

  private readonly storageManager: PersistenceManager = inject(
    LocalStoragePersistenceManager
  );
  private readonly staffService = inject(StaffPlaningService);
  mySquad = signal<Player[]>([]);

  ngOnInit(): void {
    this.storageManager.loadPlayersToSell();
    this.staffService.fetchMyTeam(this.selectedLeagueId()).subscribe({
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

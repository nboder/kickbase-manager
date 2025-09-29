import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { StaffPlaningService } from '../service/staff-planing-service';
import {
  KickbaseLeagueConstants,
  kickbasePositionToString,
  KickbaseStaffPosition,
  Player,
  SquadResponseStaff,
} from '@kickbase/definitions';
import { LeagueManagementService } from '@kickbase/UserManagement';
import { CurrencyPipe, NgClass } from '@angular/common';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
  SellingPlayer,
} from '@kickbase/persistence-management';

@Component({
  selector: 'lib-staff-planing',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './staff-planing.html',
  styleUrl: './staff-planing.scss',
})
export class StaffPlaning implements OnInit {
  private readonly storageManager: PersistenceManager = inject(
    LocalStoragePersistenceManager
  );
  private readonly staffService = inject(StaffPlaningService);
  readonly leagueService = inject(LeagueManagementService);

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

  sumOfBuyingPlayer = computed(() => {
    return 0;
  });

  finalAccountBalance = computed(() => {
    return (
      this.leagueService.getLeagueInformation().budget +
      this.sumOfSoldPlayers() -
      this.sumOfBuyingPlayer()
    );
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

  positionCssClassName(position: KickbaseStaffPosition): string {
    return 'position__' + kickbasePositionToString(position);
  }

  protected readonly kickbasePositionToString = kickbasePositionToString;
}

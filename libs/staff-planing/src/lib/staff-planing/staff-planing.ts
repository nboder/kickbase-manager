import { Component, inject, OnInit, signal } from '@angular/core';
import { StaffPlaningService } from '../service/staff-planing-service';
import { kickbasePositionToString, Player } from '@kickbase/definitions';
import { LeagueManagementService } from '@kickbase/UserManagement';
import { CurrencyPipe } from '@angular/common';
import {
  LocalStoragePersistenceManager,
  PersistenceManager,
  SellingPlayer,
} from '@kickbase/persistence-management';

@Component({
  selector: 'lib-staff-planing',
  imports: [CurrencyPipe],
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

  ngOnInit(): void {
    this.storageManager.loadPlayersToSell();
    // this.staffService
    //   .fetchMyTeam(KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID.toString())
    //   .subscribe({
    //     next: (data: SquadResponseStaff) => {
    //       console.log(data);
    //       const players = data.it.map((value) => new Player(value));
    //       const sortedPlayers = players.sort((a, b) => a.position - b.position);
    //       this.mySquad.set(sortedPlayers);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    this.mySquad.set([
      new Player({
        i: '1',
        n: 'Player One',
        mv: 500000,
        sdmvt: 10000,
        tfhmvt: 20000,
        pos: 1,
        mvgl: 1000,
      }),
      new Player({
        i: '2',
        n: 'Player Two',
        mv: 750000,
        sdmvt: 15000,
        tfhmvt: 25000,
        pos: 2,
        mvgl: 2000,
      }),
      new Player({
        i: '3',
        n: 'Player Three',
        mv: 600000,
        sdmvt: 12000,
        tfhmvt: 22000,
        pos: 3,
        mvgl: 1000,
      }),
      new Player({
        i: '4',
        n: 'Player Four',
        mv: 60120000,
        sdmvt: 12000,
        tfhmvt: 22000,
        pos: 4,
        mvgl: 1000,
      }),
    ]);
  }

  setPlayerAsSellingCandidate(player: Player, event: Event) {
    console.log(player);
    console.log((event.target as HTMLInputElement).checked);
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

  protected readonly kickbasePositionToString = kickbasePositionToString;
}

import { computed, signal, Signal } from '@angular/core';
import { Player } from '../staff/player';
import { KickbaseStaffPosition } from '../../kickbase-staff-position';

export class ManagerTeam {
  readonly managerName: Signal<string>;
  readonly squadPlayer: Signal<Player[]>;
  readonly benchPlayer: Signal<Player[]>;
  readonly totalAverageOfSquad = computed(() => {
    return this.squadPlayer().reduce((a, b) => a + b.averagePoints, 0);
  });
  readonly totalAverageOfBench = computed(() => {
    return this.benchPlayer().reduce((a, b) => a + b.averagePoints, 0);
  });

  readonly averageOfGk = computed(() => {
    return this.filterPlayersForPosition(
      KickbaseStaffPosition.GK,
      this.squadPlayer()
    ).reduce((a, b) => a + b.averagePoints, 0);
  });

  readonly averageOfDef = computed(() => {
    return this.filterPlayersForPosition(
      KickbaseStaffPosition.DEF,
      this.squadPlayer()
    ).reduce((a, b) => a + b.averagePoints, 0);
  });

  readonly averageOfMf = computed(() => {
    return this.filterPlayersForPosition(
      KickbaseStaffPosition.MID,
      this.squadPlayer()
    ).reduce((a, b) => a + b.averagePoints, 0);
  });

  readonly averageOfFwd = computed(() => {
    return this.filterPlayersForPosition(
      KickbaseStaffPosition.FWD,
      this.squadPlayer()
    ).reduce((a, b) => a + b.averagePoints, 0);
  });

  constructor(managerName: string, players: Player[]) {
    this.managerName = signal(managerName);
    this.squadPlayer = signal(this.squadPLayers(players));
    this.benchPlayer = signal(this.benchPLayers(players));
  }

  private benchPLayers(players: Player[]): Player[] {
    return this.playersInSquadOrBench(false, players);
  }

  private squadPLayers(players: Player[]): Player[] {
    return this.playersInSquadOrBench(true, players);
  }

  private playersInSquadOrBench(isSquad: boolean, players: Player[]): Player[] {
    return players.filter((player: Player) => player.isInSquad == isSquad);
  }

  private filterPlayersForPosition(
    position: KickbaseStaffPosition,
    players: Player[]
  ): Player[] {
    return players.filter((player: Player) => {
      return player.position === position;
    });
  }
}

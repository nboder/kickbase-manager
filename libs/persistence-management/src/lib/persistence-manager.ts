import { SellingPlayer } from './model/selling-player';
import { Signal } from '@angular/core';
import { CompetitionTable } from '@kickbase/definitions';

export interface PersistenceManager {
  playersToSell: Signal<SellingPlayer[]>;

  loadPlayersToSell(): void;

  containedInPlayersToSell(playerId: string): boolean;

  storeSellablePlayer(player: SellingPlayer): void;

  removeSellablePlayer(player: SellingPlayer): void;

  clearAllSellablePlayers(): void;

  saveLastLoggedInUsername(username: string): void;

  getLastLoggedInUsername(): string | null;

  removeLastLoggedInUsername(): void;

  saveCompetitionTable(competitionTable: CompetitionTable): void;
}

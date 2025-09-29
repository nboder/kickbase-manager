import { SellingPlayer } from './model/selling-player';
import { Signal } from '@angular/core';

export interface PersistenceManager {
  playersToSell: Signal<SellingPlayer[]>;

  loadPlayersToSell(): void;

  storeSellablePlayer(player: SellingPlayer): void;

  removeSellablePlayer(player: SellingPlayer): void;

  clearAllSellablePlayers(): void;
}

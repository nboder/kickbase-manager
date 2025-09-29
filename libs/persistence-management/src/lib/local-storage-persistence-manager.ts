import { PersistenceManager } from './persistence-manager';
import { Injectable, signal, Signal } from '@angular/core';
import { SellingPlayer } from './model/selling-player';

@Injectable({
  providedIn: 'root',
})
export class LocalStoragePersistenceManager implements PersistenceManager {
  private readonly STORAGE_KEY = 'playersToSell';
  private savedPlayersToSell = signal<SellingPlayer[]>([]);
  playersToSell = this.savedPlayersToSell.asReadonly();

  loadPlayersToSell(): void {
    const loadedPLayers = localStorage.getItem(this.STORAGE_KEY);
    if (loadedPLayers) {
      const players: SellingPlayer[] = JSON.parse(loadedPLayers);
      this.savedPlayersToSell.set(players);
    } else {
      this.savedPlayersToSell.set([]);
    }
  }

  clearAllSellablePlayers(): void {
    this.savedPlayersToSell.set([]);
  }

  removeSellablePlayer(player: SellingPlayer): void {
    this.savedPlayersToSell.update((currentValue) => {
      const currentPlayers = [...currentValue];
      const updatedPlayers = currentPlayers.filter(
        (value) => value.playerId != player.playerId
      );
      this.updatePlayersToSell(updatedPlayers);
      return updatedPlayers;
    });
  }

  storeSellablePlayer(player: SellingPlayer): void {
    this.savedPlayersToSell.update((currentValue) => {
      const currentPlayers = [...currentValue];
      currentPlayers.push(player);
      this.updatePlayersToSell(currentPlayers);
      return currentPlayers;
    });
  }

  private updatePlayersToSell(playersToSell: SellingPlayer[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(playersToSell));
  }
}

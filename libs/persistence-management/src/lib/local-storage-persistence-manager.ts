import { PersistenceManager } from './persistence-manager';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { SellingPlayer } from './model/selling-player';

@Injectable({
  providedIn: 'root',
})
export class LocalStoragePersistenceManager implements PersistenceManager {
  private readonly STORAGE_KEY = 'playersToSell';
  private savedPlayersToSell = signal<SellingPlayer[]>([]);
  private lookupPlayersToSell: Signal<Set<string>> = computed(
    () => new Set(this.savedPlayersToSell().map((p) => p.playerId))
  );
  playersToSell = this.savedPlayersToSell.asReadonly();

  loadPlayersToSell(): void {
    const loadedPLayers = localStorage.getItem(this.STORAGE_KEY);
    if (loadedPLayers) {
      const players: SellingPlayer[] = JSON.parse(loadedPLayers);
      this.savedPlayersToSell.set(
        players.map((p) => new SellingPlayer(p.playerId))
      );
    } else {
      this.savedPlayersToSell.set([]);
    }
  }

  containedInPlayersToSell(playerId: string): boolean {
    return this.lookupPlayersToSell().has(playerId);
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
      console.log(currentValue);
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

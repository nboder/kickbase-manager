import { PersistenceManager } from './persistence-manager';
import { computed, Injectable, signal, Signal } from '@angular/core';
import { SellingPlayer } from './model/selling-player';
import { CompetitionTable } from '@kickbase/definitions';

@Injectable({
  providedIn: 'root',
})
export class LocalStoragePersistenceManager implements PersistenceManager {
  private readonly STORAGE_KEY = 'playersToSell';
  private readonly USERNAME_STORAGE_KEY = 'lastLoggedInUser';
  private readonly COMPETITION_TABLE_STORAGE_KEY = 'competitionTable';
  private savedPlayersToSell = signal<SellingPlayer[]>([]);
  private lookupPlayersToSell: Signal<Set<string>> = computed(
    () => new Set(this.savedPlayersToSell().map((p) => p.playerId)),
  );
  playersToSell = this.savedPlayersToSell.asReadonly();

  loadPlayersToSell(): void {
    const loadedPLayers = localStorage.getItem(this.STORAGE_KEY);
    if (loadedPLayers) {
      const players: SellingPlayer[] = JSON.parse(loadedPLayers);
      this.savedPlayersToSell.set(
        players.map((p) => new SellingPlayer(p.playerId)),
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
    this.updatePlayersToSell([]);
  }

  removeSellablePlayer(player: SellingPlayer): void {
    this.savedPlayersToSell.update((currentValue) => {
      const currentPlayers = [...currentValue];
      const updatedPlayers = currentPlayers.filter(
        (value) => value.playerId != player.playerId,
      );
      this.updatePlayersToSell(updatedPlayers);
      return updatedPlayers;
    });
  }

  storeSellablePlayer(player: SellingPlayer): void {
    if (!this.lookupPlayersToSell().has(player.playerId)) {
      this.savedPlayersToSell.update((currentValue) => {
        const currentPlayers = [...currentValue];
        currentPlayers.push(player);
        this.updatePlayersToSell(currentPlayers);
        return currentPlayers;
      });
    }
  }

  getLastLoggedInUsername(): string | null {
    return localStorage.getItem(this.USERNAME_STORAGE_KEY);
  }

  saveLastLoggedInUsername(username: string): void {
    localStorage.setItem(this.USERNAME_STORAGE_KEY, username);
  }

  removeLastLoggedInUsername(): void {
    localStorage.removeItem(this.USERNAME_STORAGE_KEY);
  }

  saveCompetitionTable(competitionTable: CompetitionTable): void {
    localStorage.removeItem(this.COMPETITION_TABLE_STORAGE_KEY);
    localStorage.setItem(
      this.COMPETITION_TABLE_STORAGE_KEY,
      JSON.stringify(competitionTable),
    );
  }

  private updatePlayersToSell(playersToSell: SellingPlayer[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(playersToSell));
  }
}

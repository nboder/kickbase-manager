import { Component, inject, input, output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { PositionMarker, MarketValueTrend } from '@kickbase/PositionMarker';
import { KickbaseStaffPosition, MoneyPipe } from '@kickbase/definitions';
import { NgClass } from '@angular/common';
import { ContentDeliveryService } from '@kickbase/api-services';

@Component({
  selector: 'lib-squad-player-card',
  imports: [MatCard, PositionMarker, MarketValueTrend, MoneyPipe, NgClass],
  templateUrl: './SquadPlayerCard.html',
  styleUrl: './SquadPlayerCard.scss',
})
export class SquadPlayerCard {
  numberOfPlayer = input.required<number>();
  playerId = input.required<string>();
  playerName = input.required<string>();
  playerImageUrl = input<string>('');
  marketValue = input.required<number>();
  marketValueTrend = input.required<number>();
  marketValueWinOrLoss = input.required<number>();
  position = input.required<KickbaseStaffPosition>();
  isInSquad = input.required<boolean>();
  isBeingSold = input.required<boolean>();

  protected readonly cdnService = inject(ContentDeliveryService);

  playerShouldBeSold = output<boolean>();

  playerImagePlaceholder(): string {
    return this.playerName().charAt(0).toUpperCase();
  }
}

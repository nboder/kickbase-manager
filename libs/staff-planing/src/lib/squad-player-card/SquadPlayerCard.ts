import { Component, input, output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { PlayerNameAndValue, PositionMarker } from '@kickbase/PositionMarker';
import { KickbaseStaffPosition, MoneyPipe } from '@kickbase/definitions';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'lib-squad-player-card',
  imports: [
    MatCard,
    PositionMarker,
    PlayerNameAndValue,
    MoneyPipe,
    NgOptimizedImage,
    NgClass,
  ],
  templateUrl: './SquadPlayerCard.html',
  styleUrl: './SquadPlayerCard.scss',
})
export class SquadPlayerCard {
  numberOfPlayer = input.required<number>();
  playerId = input.required<string>();
  playerName = input.required<string>();
  marketValue = input.required<number>();
  marketValueTrend = input.required<number>();
  marketValueWinOrLoss = input.required<number>();
  position = input.required<KickbaseStaffPosition>();
  isInSquad = input.required<boolean>();
  isBeingSold = input.required<boolean>();

  playerShouldBeSold = output<boolean>();
}

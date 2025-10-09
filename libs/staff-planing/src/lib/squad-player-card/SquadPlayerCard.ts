import { Component, input, output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { PlayerNameAndValue, PositionMarker } from '@kickbase/PositionMarker';
import { KickbaseStaffPosition, MoneyPipe } from '@kickbase/definitions';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'lib-squad-player-card',
  imports: [
    MatCard,
    PositionMarker,
    PlayerNameAndValue,
    MoneyPipe,
    NgOptimizedImage,
  ],
  templateUrl: './SquadPlayerCard.html',
  styleUrl: './SquadPlayerCard.scss',
})
export class SquadPlayerCard {
  numberOfPlayer = input.required<number>();
  playerId = input.required<string>();
  playerName = input.required<string>();
  marketValue = input.required<number>();
  marketValueTrend = input<number>();
  position = input.required<KickbaseStaffPosition>();
  isInSquad = input.required<boolean>();
  isBeingSold = input.required<boolean>();

  playerShouldBeSold = output<boolean>();
}

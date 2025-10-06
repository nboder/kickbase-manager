import { Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
  MarketValueTrend,
  PlayerNameAndValue,
  PositionMarker,
} from '@kickbase/PositionMarker';
import { KickbaseStaffPosition } from '@kickbase/definitions';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'lib-squad-player-card',
  imports: [
    MatCard,
    MatCardContent,
    PositionMarker,
    PlayerNameAndValue,
    MatCheckbox,
    MarketValueTrend,
  ],
  templateUrl: './SquadPlayerCard.html',
  styleUrl: './SquadPlayerCard.scss',
})
export class SquadPlayerCard {
  playerId = input.required<string>();
  playerName = input.required<string>();
  marketValue = input.required<number>();
  marketValueTrend = input<number>();
  position = input.required<KickbaseStaffPosition>();
}

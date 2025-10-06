import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { PositionMarker } from '@kickbase/PositionMarker';
import { KickbaseStaffPosition, MoneyPipe } from '@kickbase/definitions';

@Component({
  selector: 'lib-squad-player-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardFooter,
    PositionMarker,
    MatCardTitle,
    MatCardSubtitle,
    MoneyPipe,
    MatCardContent,
  ],
  templateUrl: './SquadPlayerCard.html',
  styleUrl: './SquadPlayerCard.scss',
})
export class SquadPlayerCard {
  playerName = input.required<string>();
  marketValue = input.required<number>();
  position = input.required<KickbaseStaffPosition>();
}

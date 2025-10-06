import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-squad-player-card',
  imports: [],
  templateUrl: './SquadPlayerCard.html',
  styleUrl: './SquadPlayerCard.scss',
})
export class SquadPlayerCard {
  playerName = input.required<string>();
}

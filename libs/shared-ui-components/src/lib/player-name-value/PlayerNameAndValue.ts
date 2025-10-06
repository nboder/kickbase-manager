import { Component, input } from '@angular/core';
import { MoneyPipe } from '@kickbase/definitions';

@Component({
  selector: 'lib-player-name-and-value',
  imports: [MoneyPipe],
  templateUrl: './PlayerNameAndValue.html',
  styleUrl: './PlayerNameAndValue.scss',
})
export class PlayerNameAndValue {
  playerFirstName = input<string>('');
  playerLastName = input.required<string>();
  marketValue = input.required<number>();

  fullPlayerName(): string {
    if (this.playerFirstName()) {
      return `${this.playerFirstName()} ${this.playerLastName()}`;
    } else {
      return this.playerLastName();
    }
  }
}

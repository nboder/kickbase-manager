import { Component, input } from '@angular/core';
import { MoneyPipe } from '@kickbase/definitions';
import { MarketValueTrend } from '../market-value-trend/MarketValueTrend';

@Component({
  selector: 'lib-player-name-and-value',
  imports: [MoneyPipe, MarketValueTrend],
  templateUrl: './PlayerNameAndValue.html',
  styleUrl: './PlayerNameAndValue.scss',
})
export class PlayerNameAndValue {
  playerFirstName = input<string>('');
  playerLastName = input.required<string>();
  marketValueTrend = input<number>();

  fullPlayerName(): string {
    if (this.playerFirstName()) {
      return `${this.playerFirstName()} ${this.playerLastName()}`;
    } else {
      return this.playerLastName();
    }
  }
}

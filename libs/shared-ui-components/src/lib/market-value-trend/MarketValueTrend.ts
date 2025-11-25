import { Component, input } from '@angular/core';
import { MoneyPipe } from '@kickbase/definitions';

@Component({
  selector: 'lib-market-value-trend',
  imports: [MoneyPipe],
  templateUrl: './MarketValueTrend.html',
  styleUrl: './MarketValueTrend.scss',
})
export class MarketValueTrend {
  marketValueTrend = input<number>();

  determineMarketValueTrend(): MarketValueTrendEnum {
    const marketValue = this.marketValueTrend();
    if (marketValue === undefined || marketValue === 0) {
      return MarketValueTrendEnum.NEUTRAL;
    } else if (marketValue > 0) {
      return MarketValueTrendEnum.UP;
    } else {
      return MarketValueTrendEnum.DOWN;
    }
  }

  protected readonly MarketValueTrendEnum = MarketValueTrendEnum;
}

export enum MarketValueTrendEnum {
  UP,
  DOWN,
  NEUTRAL,
}

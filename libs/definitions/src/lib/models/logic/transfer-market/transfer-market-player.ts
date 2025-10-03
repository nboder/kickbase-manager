import { BasicPlayer } from '../basic-player';
import { MarketInformationPlayerResponse } from '../../api/transfer-market/market-information-player-response';

export class TransferMarketPlayer extends BasicPlayer {
  readonly firstName: string;
  readonly transferExpiringSeconds: number;
  twentyForHoursTrend = 0;
  teamName = '';

  constructor(responseData: MarketInformationPlayerResponse) {
    super(responseData.i, responseData.n, responseData.mv, responseData.pos);
    this.firstName = responseData.fn;
    this.transferExpiringSeconds = responseData.exs;
  }

  transferExpirationInDays(): number {
    return this.transferExpirationInHours() / 24;
  }

  transferExpirationInHours(): number {
    return this.transferExpirationInMinutes() / 60;
  }

  transferExpirationInMinutes(): number {
    return this.transferExpiringSeconds / 60;
  }
}

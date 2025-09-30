import { BasicPlayer } from '../basic-player';
import { MarketInformationPlayerResponse } from '../../api/transfer-market/market-information-player-response';

export class TransferMarketPlayer extends BasicPlayer {
  readonly firstName: string;
  readonly transferExpiringSeconds: number;

  constructor(responseData: MarketInformationPlayerResponse) {
    super(responseData.i, responseData.n, responseData.mv, responseData.pos);
    this.firstName = responseData.fn;
    this.transferExpiringSeconds = responseData.exs;
  }

  transferExpirationInHours(): number {
    return this.transferExpiringSeconds / 60 / 60;
  }

  transferExpirationInMinutes(): number {
    return this.transferExpiringSeconds / 60;
  }
}

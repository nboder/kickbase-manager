import { BasicPlayer } from '../basic-player';
import { MarketInformationPlayerResponse } from '../../api/transfer-market/market-information-player-response';
import { TransferMarketPlayerOffer } from './transfer-market-player-offer';

export class TransferMarketPlayer extends BasicPlayer {
  readonly firstName: string;
  readonly transferExpiringSeconds: number;
  readonly averagePoints: number;
  readonly totalPoints: number;
  twentyForHoursTrend = 0;
  teamName = '';
  currentOffer = TransferMarketPlayerOffer.noOffer();

  constructor(responseData: MarketInformationPlayerResponse) {
    super(responseData.i, responseData.n, responseData.mv, responseData.pos);
    this.firstName = responseData.fn;
    this.transferExpiringSeconds = responseData.exs;
    this.averagePoints = responseData.ap == undefined ? 0 : responseData.ap;
    this.totalPoints = responseData.p;
    this.currentOffer = new TransferMarketPlayerOffer(
      responseData.uop,
      responseData.uoid
    );
  }

  hasAnOffer(): boolean {
    return (
      this.currentOffer.offer > 0 && this.currentOffer.offerId != undefined
    );
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

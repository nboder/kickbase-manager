import { BasicPlayer } from '../basic-player';
import { MarketInformationPlayerResponse } from '../../api/transfer-market/market-information-player-response';
import { TransferMarketPlayerOffer } from './transfer-market-player-offer';
import { PointHistory } from './point-history';
import { PlayerPerformanceLogic } from '../commoon/player-performance-logic';

export class TransferMarketPlayer extends BasicPlayer {
  readonly firstName: string;
  readonly transferExpiringSeconds: number;
  readonly totalPoints: number;
  readonly price: number;
  twentyForHoursTrend = 0;
  teamName = '';
  currentOffer = TransferMarketPlayerOffer.noOffer();
  pointHistory: PointHistory[] = [];
  teamImageUrl = '';
  playerImageUrl = '';

  constructor(responseData: MarketInformationPlayerResponse) {
    super(
      responseData.i,
      responseData.n,
      responseData.mv,
      responseData.ap,
      responseData.pos,
    );
    this.firstName = responseData.fn;
    this.transferExpiringSeconds = responseData.exs;
    this.totalPoints = responseData.p == undefined ? 0 : responseData.p;
    this.currentOffer = new TransferMarketPlayerOffer(
      responseData.uop,
      responseData.uoid,
    );
    this.price = responseData.prc;
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

  countOfGreatGames(): number {
    return this.pointHistory.reduce((acc: number, currentValue) => {
      return (
        acc + (PlayerPerformanceLogic.isGreatGame(currentValue.points) ? 1 : 0)
      );
    }, 0);
  }

  countOfVeryGoodGames(): number {
    return this.pointHistory.reduce((acc: number, currentValue) => {
      return (
        acc +
        (PlayerPerformanceLogic.isVeryGoodGame(currentValue.points) ? 1 : 0)
      );
    }, 0);
  }

  countOfGoodGames(): number {
    return this.pointHistory.reduce((acc: number, currentValue) => {
      return (
        acc + (PlayerPerformanceLogic.isGoodGame(currentValue.points) ? 1 : 0)
      );
    }, 0);
  }

  countOfNormalGames(): number {
    return this.pointHistory.reduce((acc: number, currentValue) => {
      return (
        acc + (PlayerPerformanceLogic.isNormalGame(currentValue.points) ? 1 : 0)
      );
    }, 0);
  }

  countOfBadGames(): number {
    return this.pointHistory.reduce((acc: number, currentValue) => {
      return (
        acc + (PlayerPerformanceLogic.isBadGame(currentValue.points) ? 1 : 0)
      );
    }, 0);
  }

  countOfNotPlayedGames(): number {
    return this.pointHistory.reduce((acc: number, currentValue) => {
      return (
        acc +
        (PlayerPerformanceLogic.notPlayedGames(currentValue.points) ? 1 : 0)
      );
    }, 0);
  }

  countOfGames(): number {
    return this.pointHistory.length;
  }
}

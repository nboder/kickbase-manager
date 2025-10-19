import { SquadResponsePlayer } from '../../api/squad/squad-response-player';
import { BasicPlayer } from '../basic-player';

export class Player extends BasicPlayer {
  readonly sevenDayPrediction: number;
  readonly twentyForHoursDevelopment: number;
  readonly isInSquad: boolean;
  readonly marketValueWinOrLoss: number;
  readonly isOnTransferMarket: boolean;

  constructor(responseData: SquadResponsePlayer) {
    super(responseData.i, responseData.n, responseData.mv, responseData.pos);
    this.sevenDayPrediction = responseData.sdmvt;
    this.twentyForHoursDevelopment = responseData.tfhmvt;
    this.isInSquad = responseData.lo != undefined;
    this.marketValueWinOrLoss = responseData.mvgl;
    this.isOnTransferMarket = responseData.iotm;
  }
}

import { SquadResponsePlayer } from '../../api/squad/squad-response-player';
import { BasicPlayer } from '../basic-player';
import { ManagerSquadPlayerResponse } from '../../api/manager/manager-squad-player-response';

export class Player extends BasicPlayer {
  readonly sevenDayPrediction: number;
  readonly twentyForHoursDevelopment: number;
  readonly isInSquad: boolean;
  readonly marketValueWinOrLoss: number;
  readonly isOnTransferMarket: boolean;

  constructor(
    playerId: string,
    name: string,
    marketValue: number,
    averagePoints: number | undefined,
    position: number,
    sevenDayPrediction: number,
    twentyForHoursDevelopment: number,
    isInSquad: boolean,
    marketValueWinOrLoss: number,
    isOnTransferMarket: boolean,
  ) {
    super(playerId, name, marketValue, averagePoints, position);
    this.sevenDayPrediction = sevenDayPrediction;
    this.twentyForHoursDevelopment = twentyForHoursDevelopment;
    this.isInSquad = isInSquad;
    this.marketValueWinOrLoss = marketValueWinOrLoss;
    this.isOnTransferMarket = isOnTransferMarket;
  }

  static playerFromSquadResponsePlayer(
    squadResponsePlayer: SquadResponsePlayer,
  ): Player {
    return new Player(
      squadResponsePlayer.i,
      squadResponsePlayer.n,
      squadResponsePlayer.mv,
      squadResponsePlayer.ap,
      squadResponsePlayer.pos,
      squadResponsePlayer.sdmvt,
      squadResponsePlayer.tfhmvt,
      squadResponsePlayer.lo != undefined,
      squadResponsePlayer.mvgl,
      squadResponsePlayer.iotm,
    );
  }

  static playerFromManagerPlayerResponse(
    playerResponse: ManagerSquadPlayerResponse,
  ): Player {
    return new Player(
      playerResponse.pi,
      playerResponse.pn,
      playerResponse.mv,
      playerResponse.ap,
      playerResponse.pos,
      playerResponse.sdmvt,
      playerResponse.tfhmv,
      playerResponse.lo != undefined,
      playerResponse.mvgl,
      playerResponse.iotm,
    );
  }
}

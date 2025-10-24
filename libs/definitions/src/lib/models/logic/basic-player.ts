import {
  kickbasePositionFromValue,
  KickbaseStaffPosition,
} from '../kickbase-staff-position';

export abstract class BasicPlayer {
  readonly playerId: string;
  readonly name: string;
  readonly marketValue: number;
  readonly averagePoints: number;
  readonly position: KickbaseStaffPosition;

  protected constructor(
    playerId: string,
    name: string,
    marketValue: number,
    averagePoints: number | undefined,
    position: number
  ) {
    this.playerId = playerId;
    this.name = name;
    this.marketValue = marketValue;
    this.averagePoints = averagePoints == undefined ? 0 : averagePoints;
    this.position = kickbasePositionFromValue(position);
  }
}

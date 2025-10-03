import {
  kickbasePositionFromValue,
  KickbaseStaffPosition,
} from '../kickbase-staff-position';

export abstract class BasicPlayer {
  readonly playerId: string;
  readonly name: string;
  readonly marketValue: number;
  readonly position: KickbaseStaffPosition;

  protected constructor(
    playerId: string,
    name: string,
    marketValue: number,
    position: number
  ) {
    this.playerId = playerId;
    this.name = name;
    this.marketValue = marketValue;
    this.position = kickbasePositionFromValue(position);
  }
}

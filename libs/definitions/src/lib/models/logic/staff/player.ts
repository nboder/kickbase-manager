import { StaffResponsePlayer } from '../../api/staff/staff-response-player';
import {
  kickbasePositionFromValue,
  KickbaseStaffPosition,
} from '../../kickbase-staff-position';

export class Player {
  readonly playerId: string;
  readonly name: string;
  readonly marketValue: number;
  readonly sevenDayPrediction: number;
  readonly twentyForHoursDevelopment: number;
  readonly position: KickbaseStaffPosition;

  constructor(responseData: StaffResponsePlayer) {
    this.playerId = responseData.i;
    this.name = responseData.n;
    this.marketValue = responseData.mv;
    this.sevenDayPrediction = responseData.sdmvt;
    this.twentyForHoursDevelopment = responseData.tfhmvt;
    this.position = kickbasePositionFromValue(responseData.pos);
  }
}

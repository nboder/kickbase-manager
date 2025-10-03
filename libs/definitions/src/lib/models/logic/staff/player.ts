import { StaffResponsePlayer } from '../../api/staff/staff-response-player';
import { BasicPlayer } from '../basic-player';

export class Player extends BasicPlayer {
  readonly sevenDayPrediction: number;
  readonly twentyForHoursDevelopment: number;
  readonly isInSquad: boolean;

  constructor(responseData: StaffResponsePlayer) {
    super(responseData.i, responseData.n, responseData.mv, responseData.pos);
    this.sevenDayPrediction = responseData.sdmvt;
    this.twentyForHoursDevelopment = responseData.tfhmvt;
    this.isInSquad = responseData.lo != undefined;
  }
}

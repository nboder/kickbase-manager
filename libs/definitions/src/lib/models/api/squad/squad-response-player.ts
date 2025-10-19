import { BasicPlayerResponse } from '../basic-player-response';

export interface SquadResponsePlayer extends BasicPlayerResponse {
  readonly mvgl: number; // Market Value since buy
  readonly n: string; // Name
  readonly sdmvt: number; // 7 Day Prediction
  readonly lo: number | undefined; // is in Squad, Value is the position on the filed.
  readonly iotm: boolean;
}

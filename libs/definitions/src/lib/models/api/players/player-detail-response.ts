import { BasicPlayerResponse } from '../basic-player-response';

export interface PlayerDetailResponse extends BasicPlayerResponse {
  readonly fn: string;
  readonly ln: string;
  readonly tn: string; // Team Name
  readonly ap: number; // Average Points
  readonly tim: string; // Team image Url
  readonly pim: string; // Player image Url
}

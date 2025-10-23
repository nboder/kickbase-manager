import { BasicPlayerResponse } from '../basic-player-response';
import { PointHistoryResponse } from './point-history-response';

export interface PlayerDetailResponse extends BasicPlayerResponse {
  readonly fn: string;
  readonly ln: string;
  readonly tn: string; // Team Name
  readonly ap: number; // Average Points
  readonly ph: PointHistoryResponse[];
}

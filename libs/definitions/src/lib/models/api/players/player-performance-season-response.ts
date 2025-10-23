import { PlayerPerformancePointHistoryResponse } from './player-performance-point-history-response';

export interface PlayerPerformanceSeasonResponse {
  readonly ti: string; //Name of the year for example 2025/2026
  readonly n: string; //Name of the Liga.
  readonly ph: PlayerPerformancePointHistoryResponse[];
}

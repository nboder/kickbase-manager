import { PlayerPerformancePointHistoryResponse } from '../../api/players/player-performance-point-history-response';

export class PointHistory {
  readonly hasPlayed: boolean;
  readonly points: number | undefined;

  constructor(performanceResponse: PlayerPerformancePointHistoryResponse) {
    this.hasPlayed = performanceResponse.p != undefined;
    this.points = performanceResponse.p;
  }
}

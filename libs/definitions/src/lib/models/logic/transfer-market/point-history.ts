import { PointHistoryResponse } from '../../api/players/point-history-response';

export class PointHistory {
  readonly hasPlayed: boolean;
  readonly points: number | undefined;

  constructor(pointHistory: PointHistoryResponse) {
    this.hasPlayed = pointHistory.hp;
    this.points = pointHistory.p;
  }
}

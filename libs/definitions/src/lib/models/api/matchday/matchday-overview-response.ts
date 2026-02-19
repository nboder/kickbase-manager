import { MatchdayResponse } from './matchday-response';

export interface MatchdayOverviewResponse {
  readonly it: MatchdayResponse[];
  readonly day: number;
}

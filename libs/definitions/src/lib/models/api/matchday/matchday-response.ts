import { MatchdayMatchResponse } from './matchday-match-response';

export interface MatchdayResponse {
  readonly day: number;
  readonly it: MatchdayMatchResponse[];
}

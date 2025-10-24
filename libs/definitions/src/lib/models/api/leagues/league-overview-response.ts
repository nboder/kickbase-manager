import { LeagueOverviewUserResponse } from './league-overview-user-response';

export interface LeagueOverviewResponse {
  readonly i: string;
  readonly lnm: string;
  readonly us: LeagueOverviewUserResponse[];
}

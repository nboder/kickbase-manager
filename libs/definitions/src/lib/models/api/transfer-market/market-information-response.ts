import { MarketInformationPlayerResponse } from './market-information-player-response';

export interface MarketInformationResponse {
  readonly it: MarketInformationPlayerResponse[];
  readonly mvud: string; // Next Market Value Update (Date in UTC)
  readonly dt: string; // Matchday information (Date in UTC)
  readonly day: number;
}

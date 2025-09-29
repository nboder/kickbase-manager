import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  KickbaseApi,
  MarketInformationResponse,
  PlayerResponseInformation,
  SquadResponseStaff,
} from '@kickbase/definitions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffPlaningService {
  private readonly httpClient = inject(HttpClient);

  fetchMyTeam(leagueId: string): Observable<SquadResponseStaff> {
    return this.httpClient.get<SquadResponseStaff>(
      KickbaseApi.mySquadUrl(leagueId)
    );
  }

  fetchMarketInformation(
    leagueId: string
  ): Observable<MarketInformationResponse> {
    return this.httpClient.get<MarketInformationResponse>(
      KickbaseApi.marketUrl(leagueId)
    );
  }

  fetchPlayerDetails(
    leagueId: string,
    playerId: string
  ): Observable<PlayerResponseInformation> {
    return this.httpClient.get<PlayerResponseInformation>(
      KickbaseApi.playerInformationUrl(leagueId, playerId)
    );
  }
}

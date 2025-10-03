import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KickbaseApi, MarketInformationResponse } from '@kickbase/definitions';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransferMarketService {
  private readonly httpClient = inject(HttpClient);

  fetchTransferMarketInformation(
    leagueId: string
  ): Observable<MarketInformationResponse> {
    return this.httpClient.get<MarketInformationResponse>(
      KickbaseApi.marketUrl(leagueId)
    );
  }
}

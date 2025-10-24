import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  KickbaseApi,
  MarketInformationResponse,
  PlacerOfferResponse,
  PlayerDetailResponse,
  PlayerPerformanceResponse,
} from '@kickbase/definitions';
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

  fetchPlayerDetails(
    leagueId: string,
    playerId: string
  ): Observable<PlayerDetailResponse> {
    return this.httpClient.get<PlayerDetailResponse>(
      KickbaseApi.playerInformationUrl(leagueId, playerId)
    );
  }

  fetchPlayerPerformance(
    leagueId: string,
    playerId: string
  ): Observable<PlayerPerformanceResponse> {
    return this.httpClient.get<PlayerPerformanceResponse>(
      KickbaseApi.playerPerformanceUrl(leagueId, playerId)
    );
  }

  placeOffer(
    leagueId: string,
    playerId: string,
    offerPrice: number
  ): Observable<PlacerOfferResponse> {
    return this.httpClient.post<PlacerOfferResponse>(
      KickbaseApi.placeOfferUrl(leagueId, playerId),
      {
        price: offerPrice,
      }
    );
  }

  withdrawPlayerOffer(
    leagueId: string,
    playerId: string,
    offerId: string
  ): Observable<object> {
    return this.httpClient.delete(
      KickbaseApi.withDrawOfferUrl(leagueId, playerId, offerId)
    );
  }
}

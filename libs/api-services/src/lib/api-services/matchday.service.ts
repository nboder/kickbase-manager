import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatchdayOverviewResponse, KickbaseApi } from '@kickbase/definitions';

@Injectable({
  providedIn: 'root',
})
export class MatchdayService {
  private readonly httpClient = inject(HttpClient);

  fetchMatchdays(competitionId: string): Observable<MatchdayOverviewResponse> {
    return this.httpClient.get<MatchdayOverviewResponse>(
      KickbaseApi.matchDayUrl(competitionId),
    );
  }
}

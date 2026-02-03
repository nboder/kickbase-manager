import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetitionTableResponse, KickbaseApi } from '@kickbase/definitions';

@Injectable({
  providedIn: 'root',
})
export class CompetitionApiService {
  private readonly httpClient = inject(HttpClient);

  fetchTableOfCompetition(
    competitionId: string
  ): Observable<CompetitionTableResponse> {
    return this.httpClient.get<CompetitionTableResponse>(
      KickbaseApi.competitionTableUrl(competitionId)
    );
  }
}

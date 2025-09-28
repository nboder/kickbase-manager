import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  KickbaseApi,
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
}

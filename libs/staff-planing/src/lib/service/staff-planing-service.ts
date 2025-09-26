import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KickbaseApi, KickbaseLeagueConstants } from '@kickbase/definitions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffPlaningService {
  private readonly httpClient = inject(HttpClient);

  fetchMyTeam(leagueId: string) {
    this.httpClient
      .get(
        KickbaseApi.mySquadUrl(
          leagueId,
        )
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KickbaseApi, ManagerResponse } from '@kickbase/definitions';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private readonly httpClient = inject(HttpClient);

  fetchManagerInformation(
    leagueId: string,
    managerId: string
  ): Observable<ManagerResponse> {
    return this.httpClient.get<ManagerResponse>(
      KickbaseApi.managerDashboardUrl(leagueId, managerId)
    );
  }
}

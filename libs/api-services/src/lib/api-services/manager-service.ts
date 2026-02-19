import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BudgetResponse,
  KickbaseApi,
  LeagueOverviewResponse,
  ManagerResponse,
  ManagerSquadResponse,
} from '@kickbase/definitions';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private readonly httpClient = inject(HttpClient);

  fetchManagerInformation(
    leagueId: string,
    managerId: string,
  ): Observable<ManagerResponse> {
    return this.httpClient.get<ManagerResponse>(
      KickbaseApi.managerDashboardUrl(leagueId, managerId),
    );
  }

  fetchBudgetInformation(leagueId: string): Observable<BudgetResponse> {
    return this.httpClient.get<BudgetResponse>(
      KickbaseApi.managerBudgetUrl(leagueId),
    );
  }

  fetchLeagueOverview(leagueId: string): Observable<LeagueOverviewResponse> {
    const params = new HttpParams().set(
      KickbaseApi.INCLUDE_MANAGERS_AND_BATTLES_QUERY_PARAM,
      true,
    );
    return this.httpClient.get<LeagueOverviewResponse>(
      KickbaseApi.leagueOverviewUrl(leagueId),
      {
        params: params,
      },
    );
  }

  fetchManagerSquad(
    leagueId: string,
    managerId: string,
  ): Observable<ManagerSquadResponse> {
    return this.httpClient.get<ManagerSquadResponse>(
      KickbaseApi.managerSquadUrl(leagueId, managerId),
    );
  }
}

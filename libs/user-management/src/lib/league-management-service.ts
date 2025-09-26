import { Injectable } from '@angular/core';
import { GeneralLeagueInformation } from './general-league-information';

@Injectable({
  providedIn: 'root',
})
export class LeagueManagementService {
  private leagueInformation = GeneralLeagueInformation.noLeagueInformation();

  setLeagueInformation(
    budget: number,
    teamValue: number,
    placement: number,
    points: number
  ) {
    this.leagueInformation = new GeneralLeagueInformation(
      budget,
      teamValue,
      placement,
      points
    );
  }

  getLeagueInformation(): GeneralLeagueInformation {
    return this.leagueInformation;
  }
}

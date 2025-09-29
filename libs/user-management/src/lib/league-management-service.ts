import { Injectable } from '@angular/core';
import { GeneralLeagueInformation } from './general-league-information';

@Injectable({
  providedIn: 'root',
})
export class LeagueManagementService {
  private leagueInformation = GeneralLeagueInformation.noLeagueInformation();
  private LEAGUE_INFORMATION_KEY = 'leagueInformation';

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
    localStorage.setItem(
      this.LEAGUE_INFORMATION_KEY,
      JSON.stringify(this.leagueInformation)
    );
  }

  getLeagueInformation(): GeneralLeagueInformation {
    const leagueInformation = localStorage.getItem(this.LEAGUE_INFORMATION_KEY);
    if (leagueInformation) {
      const parsedItem: GeneralLeagueInformation =
        JSON.parse(leagueInformation);
      return new GeneralLeagueInformation(
        parsedItem.budget,
        parsedItem.teamValue,
        parsedItem.placement,
        parsedItem.points
      );
    } else {
      return GeneralLeagueInformation.noLeagueInformation();
    }
  }
}

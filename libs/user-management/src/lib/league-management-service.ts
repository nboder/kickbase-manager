import { Injectable } from '@angular/core';
import { GeneralLeagueInformation } from './general-league-information';

@Injectable({
  providedIn: 'root',
})
export class LeagueManagementService {
  private leagueInformation = GeneralLeagueInformation.noLeagueInformation();
  private LEAGUE_INFORMATION_KEY = 'leagueInformation';

  setLeagueInformation(
    id: string,
    name: string,
    budget: number,
    teamValue: number,
    placement: number,
    points: number
  ) {
    this.leagueInformation = new GeneralLeagueInformation(
      id,
      name,
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
    console.log(this.leagueInformation);
    const leagueInformation = localStorage.getItem(this.LEAGUE_INFORMATION_KEY);
    if (leagueInformation) {
      const parsedItem: GeneralLeagueInformation =
        JSON.parse(leagueInformation);
      return new GeneralLeagueInformation(
        parsedItem.id,
        parsedItem.name,
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

import { Injectable } from '@angular/core';
import { GeneralLeagueInformation } from './general-league-information';

@Injectable({
  providedIn: 'root',
})
export class LeagueManagementService {
  private leagueInformation = GeneralLeagueInformation.noLeagueInformation();
  private LEAGUE_INFORMATION_KEY = 'leagueInformation';
  private AVAILAVLE_LEAGUES_KEY = 'availableLeagues';

  setAvailableLeagues(leagues: GeneralLeagueInformation[]) {
    localStorage.setItem(this.AVAILAVLE_LEAGUES_KEY, JSON.stringify(leagues));
  }

  getAvailableLeagues(): GeneralLeagueInformation[] {
    const leagueInformations = localStorage.getItem(this.AVAILAVLE_LEAGUES_KEY);
    if (leagueInformations) {
      const parsedLeagues: GeneralLeagueInformation[] =
        JSON.parse(leagueInformations);
      return parsedLeagues.map((value) => {
        return new GeneralLeagueInformation(
          value.id,
          value.name,
          value.budget,
          value.teamValue,
          value.placement,
          value.points
        );
      });
    } else {
      return [];
    }
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

import { Component, computed, inject, OnInit } from '@angular/core';
import {
  GeneralLeagueInformation,
  LeagueManagementService,
} from '@kickbase/UserManagement';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AppRouteDefinitions, CompetitionTable } from '@kickbase/definitions';
import { CompetitionManagementService } from '@kickbase/CompetitionManagement';

@Component({
  selector: 'lib-league-selection',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    RouterLink,
  ],
  templateUrl: './LeagueSelection.html',
  styleUrl: './LeagueSelection.scss',
})
export class LeagueSelection {
  private readonly router = inject(Router);
  private readonly leagueManagementService = inject(LeagueManagementService);
  private readonly competitionTableService = inject(
    CompetitionManagementService,
  );

  currentLeague = computed(() => {
    return this.leagueManagementService.getLeagueInformation();
  });

  availableLeagues = computed(() => {
    return this.leagueManagementService.getAvailableLeagues();
  });

  selectLeague(league: GeneralLeagueInformation) {
    this.leagueManagementService.setCurrentLeague(league);
    this.competitionTableService
      .fetchCompetitionTable(league.competitionId)
      .subscribe({
        next: (result) => {
          this.competitionTableService.saveCurrentTable(
            CompetitionTable.createFromApi(result),
          );
          this.router.navigate([AppRouteDefinitions.MANAGEMENT, league.id]);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  protected readonly AppRouteDefinitions = AppRouteDefinitions;
}

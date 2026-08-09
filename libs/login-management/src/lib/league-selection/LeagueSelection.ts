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
import { Router } from '@angular/router';
import { AppRouteDefinitions } from '@kickbase/definitions';

@Component({
  selector: 'lib-league-selection',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
  ],
  templateUrl: './LeagueSelection.html',
  styleUrl: './LeagueSelection.scss',
})
export class LeagueSelection implements OnInit {
  private readonly router = inject(Router);
  private readonly leagueManagementService = inject(LeagueManagementService);

  currentLeague = computed(() => {
    return this.leagueManagementService.getLeagueInformation();
  });

  availableLeagues = computed(() => {
    return this.leagueManagementService.getAvailableLeagues();
  });

  ngOnInit(): void {
    const leagues = this.availableLeagues();
    if (leagues.length === 1) {
      this.selectLeague(leagues[0]);
    }
  }

  selectLeague(league: GeneralLeagueInformation) {
    this.leagueManagementService.setLeagueInformation(league);
    this.router.navigate([
      '/',
      AppRouteDefinitions.MANAGEMENT,
      league.id,
    ]);
  }
}

import { Component, computed, inject } from '@angular/core';
import { LeagueManagementService } from '@kickbase/UserManagement';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
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
    RouterLink,
  ],
  templateUrl: './LeagueSelection.html',
  styleUrl: './LeagueSelection.scss',
})
export class LeagueSelection {
  private readonly router = inject(Router);
  private readonly leagueManagementService = inject(LeagueManagementService);

  currentLeague = computed(() => {
    return this.leagueManagementService.getLeagueInformation();
  });

  protected readonly AppRouteDefinitions = AppRouteDefinitions;
}

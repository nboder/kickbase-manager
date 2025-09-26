import { Component, inject, OnInit } from '@angular/core';
import { StaffPlaningService } from '../service/staff-planing-service';
import { KickbaseLeagueConstants } from '@kickbase/definitions';
import { LeagueManagementService } from '@kickbase/UserManagement';

@Component({
  selector: 'lib-staff-planing',
  imports: [],
  templateUrl: './staff-planing.html',
  styleUrl: './staff-planing.scss',
})
export class StaffPlaning implements OnInit {
  private readonly staffService = inject(StaffPlaningService);
  readonly leagueService = inject(LeagueManagementService);

  ngOnInit(): void {
    this.staffService.fetchMyTeam(
      KickbaseLeagueConstants.STROHGAEU_BUBEN_LEAGUE_ID.toString()
    );
  }
}

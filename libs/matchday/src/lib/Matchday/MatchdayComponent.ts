import { Component, inject, OnInit, signal } from '@angular/core';
import { Matchday } from '@kickbase/definitions';
import { MatchdayService } from '@kickbase/api-services';
import { LeagueManagementService } from '@kickbase/UserManagement';

@Component({
  selector: 'lib-matchday',
  imports: [],
  templateUrl: './MatchdayComponent.html',
  styleUrl: './MatchdayComponent.scss',
})
export class MatchdayComponent implements OnInit {
  readonly matchdays = signal<Matchday[]>([]);
  readonly currentMatchday = signal<number>(0);

  private readonly matchdayService = inject(MatchdayService);
  private readonly leagueManagementService = inject(LeagueManagementService);

  ngOnInit(): void {
    this.matchdayService
      .fetchMatchdays(
        this.leagueManagementService.getLeagueInformation().competitionId,
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

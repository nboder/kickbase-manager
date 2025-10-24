import { Component, inject, OnInit, signal } from '@angular/core';
import { ManagerService } from '@kickbase/api-services';
import { ActivatedRoute } from '@angular/router';
import {
  AppRouteDefinitions,
  LeagueOverviewUserResponse,
  Player,
} from '@kickbase/definitions';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'lib-manager-average-point-fun-facts',
  imports: [KeyValuePipe],
  templateUrl: './manager-average-point-fun-facts.html',
  styleUrl: './manager-average-point-fun-facts.css',
})
export class ManagerAveragePointFunFacts implements OnInit {
  private readonly managerService = inject(ManagerService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private selectedLeaguedId = signal<string>('');
  squadPerManager = signal<Map<string, Player[]>>(new Map<string, Player[]>());

  ngOnInit(): void {
    const leagueId = this.activatedRoute.parent?.snapshot.paramMap.get(
      AppRouteDefinitions.PATH_PARAM_LEAGUE_ID
    );
    if (leagueId) {
      this.selectedLeaguedId.set(leagueId);
      this.managerService.fetchLeagueOverview(leagueId).subscribe({
        next: (data) => {
          this.fetchSquadForAllManagers(data.us);
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      console.log(
        'URL has been modified. This will result in an error Page in the near future.'
      );
    }
  }

  averagePointsForSquadForManager(managerId: string): number {
    const squadForManager = this.squadPerManager().get(managerId);
    if (squadForManager) {
      return squadForManager
        .filter((player) => player.isInSquad)
        .reduce((a, b) => a + b.averagePoints, 0);
    } else {
      return -1;
    }
  }

  averagePointsForBenchForManager(managerId: string): number {
    const squadForManager = this.squadPerManager().get(managerId);
    if (squadForManager) {
      return squadForManager
        .filter((player) => !player.isInSquad)
        .reduce((a, b) => a + b.averagePoints, 0);
    } else {
      return -1;
    }
  }

  private fetchSquadForAllManagers(
    managers: LeagueOverviewUserResponse[]
  ): void {
    managers.forEach((user) => {
      this.managerService
        .fetchManagerSquad(this.selectedLeaguedId(), user.i)
        .subscribe({
          next: (data) => {
            this.squadPerManager().set(
              user.n,
              data.it.map((value) =>
                Player.playerFromManagerPlayerResponse(value)
              )
            );
            console.log(data);
          },
          error: (err) => {
            console.error(err);
          },
        });
    });
  }
}

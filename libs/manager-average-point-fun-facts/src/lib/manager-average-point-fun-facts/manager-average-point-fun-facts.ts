import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ManagerService } from '@kickbase/api-services';
import { ActivatedRoute } from '@angular/router';
import {
  AppRouteDefinitions,
  LeagueOverviewResponse,
  LeagueOverviewUserResponse,
  ManagerTeam,
  Player,
} from '@kickbase/definitions';
import { Chart, registerables } from 'chart.js';
import { ChartDataProvider } from '../data-provider/chart-data-provider';
import { TotalStateDataProvider } from '../data-provider/total-state-data-provider';

@Component({
  selector: 'lib-manager-average-point-fun-facts',
  imports: [],
  templateUrl: './manager-average-point-fun-facts.html',
  styleUrl: './manager-average-point-fun-facts.scss',
})
export class ManagerAveragePointFunFacts implements OnInit, AfterViewInit {
  private readonly managerService = inject(ManagerService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private selectedLeaguedId = signal<string>('');
  @ViewChild('totalStats')
  private totalStatsCanvas: ElementRef<HTMLCanvasElement> | undefined;
  squadPerManager = signal<Map<string, Player[]>>(new Map<string, Player[]>());
  private leagueOverview = signal<LeagueOverviewResponse | undefined>(
    undefined
  );
  private hasViewBeenInitialized = signal(false);
  private canRenderCharts = computed(() => {
    return (
      this.hasViewBeenInitialized() &&
      this.squadPerManager().size === this.leagueOverview()?.us.length
    );
  });

  constructor() {
    effect(() => {
      if (this.canRenderCharts()) {
        this.setupBarChart();
      }
    });
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    const leagueId = this.activatedRoute.parent?.snapshot.paramMap.get(
      AppRouteDefinitions.PATH_PARAM_LEAGUE_ID
    );
    if (leagueId) {
      this.selectedLeaguedId.set(leagueId);
      this.managerService.fetchLeagueOverview(leagueId).subscribe({
        next: (data) => {
          this.leagueOverview.set(data);
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

  ngAfterViewInit(): void {
    this.hasViewBeenInitialized.set(true);
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

  private setupBarChart() {
    if (this.canRenderCharts()) {
      const managerTeams: ManagerTeam[] = [];
      for (const [key, value] of this.squadPerManager()) {
        managerTeams.push(new ManagerTeam(key, value));
      }
      const totalStatsProvider: ChartDataProvider = new TotalStateDataProvider(
        managerTeams
      );
      const context = this.totalStatsCanvas?.nativeElement.getContext('2d');
      if (context) {
        const chart = new Chart(context, {
          type: totalStatsProvider.chartType,
          data: {
            labels: totalStatsProvider.labels,
            datasets: totalStatsProvider.datasets,
          },
          options: {
            indexAxis: 'y',
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                ticks: {
                  callback: function (index) {
                    const currentLabel = totalStatsProvider.labelAtIndex(
                      index as number
                    );

                    return currentLabel;
                  },
                },
              },
            },
          },
        });
      } else {
        console.error('Total stats Canvas cannot be loaded');
      }
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
            this.squadPerManager.update((value) => {
              const newMap = new Map(value);
              newMap.set(
                user.n,
                data.it.map((value) =>
                  Player.playerFromManagerPlayerResponse(value)
                )
              );
              return newMap;
            });
          },
          error: (err) => {
            console.error(err);
          },
        });
    });
  }
}

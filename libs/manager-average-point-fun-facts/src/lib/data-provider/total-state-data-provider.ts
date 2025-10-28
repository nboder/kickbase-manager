import { ChartDataProvider } from './chart-data-provider';
import { DataSetConfiguration } from './data-set-configuration';
import { ManagerTeam } from '@kickbase/definitions';
import { ChartType } from 'chart.js';
import { AbstractBarManagerBarChartDataProvider } from './abstract-bar-manager-bar-chart-data-provider';

export class TotalStateDataProvider extends AbstractBarManagerBarChartDataProvider {
  datasets: DataSetConfiguration[];

  constructor(managerTeams: ManagerTeam[]) {
    super(managerTeams);
    this.datasets = [
      this.squadDataSet(this.teams),
      this.benchDataSet(this.teams),
    ];
  }

  private squadDataSet(teams: ManagerTeam[]): DataSetConfiguration {
    return {
      label: 'Squad',
      data: teams.map((team) => team.totalAverageOfSquad()),
    };
  }

  private benchDataSet(teams: ManagerTeam[]): DataSetConfiguration {
    return {
      label: 'Bench',
      data: teams.map((team) => team.totalAverageOfBench()),
    };
  }
}

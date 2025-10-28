import { ChartDataProvider } from './chart-data-provider';
import { DataSetConfiguration } from './data-set-configuration';
import { ManagerTeam } from '@kickbase/definitions';
import { ChartType } from 'chart.js';

export class TotalStateDataProvider implements ChartDataProvider {
  chartType: ChartType = 'bar';
  datasets: DataSetConfiguration[];
  labels: string[];

  private readonly teams: ManagerTeam[];

  constructor(managerTeams: ManagerTeam[]) {
    if (managerTeams.length === 0) {
      console.error('No data passed to TotalStateDataProvider.');
    }
    this.teams = managerTeams.sort((value1, value2) => {
      return value2.totalAverageOfSquad() - value1.totalAverageOfSquad();
    });
    this.labels = this.teams.map((team) => team.managerName());
    this.datasets = [
      this.squadDataSet(this.teams),
      this.benchDataSet(this.teams),
    ];
  }

  labelAtIndex(index: number): string {
    if (index >= 0 && index < this.labels.length) {
      return this.labels[index];
    }
    return '';
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

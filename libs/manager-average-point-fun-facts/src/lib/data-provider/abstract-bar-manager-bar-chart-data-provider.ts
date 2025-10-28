import { ChartDataProvider } from './chart-data-provider';
import { ChartType } from 'chart.js';
import { DataSetConfiguration } from './data-set-configuration';
import { ManagerTeam } from '@kickbase/definitions';

export abstract class AbstractBarManagerBarChartDataProvider
  implements ChartDataProvider
{
  chartType: ChartType = 'bar';
  labels: string[];
  abstract datasets: DataSetConfiguration[];

  protected readonly teams: ManagerTeam[];

  protected constructor(teams: ManagerTeam[]) {
    this.teams = teams.sort((value1, value2) => {
      return value2.totalAverageOfSquad() - value1.totalAverageOfSquad();
    });
    this.labels = this.teams.map((team) => team.managerName());
  }

  labelAtIndex(index: number): string {
    if (index >= 0 && index < this.labels.length) {
      return this.labels[index];
    }
    return '';
  }
}

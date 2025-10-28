import { DataSetConfiguration } from './data-set-configuration';
import { ManagerTeam } from '@kickbase/definitions';
import { AbstractBarManagerBarChartDataProvider } from './abstract-bar-manager-bar-chart-data-provider';
import { Data } from '@angular/router';

export class PositionBasedDataProvider extends AbstractBarManagerBarChartDataProvider {
  datasets: DataSetConfiguration[];

  constructor(teams: ManagerTeam[]) {
    super(teams);
    this.datasets = [
      this.gkDataSet(teams),
      this.defDataSet(teams),
      this.mfDataSet(teams),
      this.fwdDataSet(teams),
    ];
  }

  private gkDataSet(teams: ManagerTeam[]): DataSetConfiguration {
    return {
      label: 'GK',
      data: teams.map((team) => team.averageOfGk()),
    };
  }
  private defDataSet(teams: ManagerTeam[]): DataSetConfiguration {
    return {
      label: 'DEF',
      data: teams.map((team) => team.averageOfDef()),
    };
  }
  private mfDataSet(teams: ManagerTeam[]): DataSetConfiguration {
    return {
      label: 'MF',
      data: teams.map((team) => team.averageOfMf()),
    };
  }
  private fwdDataSet(teams: ManagerTeam[]): DataSetConfiguration {
    return {
      label: 'FWD',
      data: teams.map((team) => team.averageOfFwd()),
    };
  }
}

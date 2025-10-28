import { DataSetConfiguration } from './data-set-configuration';
import { ChartType } from 'chart.js';

export interface ChartDataProvider {
  chartType: ChartType;
  labels: string[];
  datasets: DataSetConfiguration[];

  labelAtIndex(index: number): string;
}

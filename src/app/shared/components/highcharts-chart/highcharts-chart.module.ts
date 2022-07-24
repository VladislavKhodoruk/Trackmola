import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { HighchartsChartComponent } from './highcharts-chart.component';

@NgModule({
  declarations: [HighchartsChartComponent],
  exports: [HighchartsChartComponent],
  imports: [ChartModule],
})
export class HighchartsChartModule {}

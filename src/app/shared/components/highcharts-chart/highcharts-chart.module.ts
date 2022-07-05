import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { HighchartsChartComponent } from './highcharts-chart.component';

@NgModule({
  declarations: [HighchartsChartComponent],
  imports: [ChartModule],
  exports: [HighchartsChartComponent],
})
export class HighchartsChartModule {}

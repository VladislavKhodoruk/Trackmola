import { NgModule } from '@angular/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';

import * as tree from 'highcharts/modules/treemap.src';

import { HighchartsChartComponent } from './highcharts-chart.component';

@NgModule({
  declarations: [HighchartsChartComponent],
  exports: [HighchartsChartComponent],
  imports: [ChartModule],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [tree] }],
})
export class HighchartsChartModule {}

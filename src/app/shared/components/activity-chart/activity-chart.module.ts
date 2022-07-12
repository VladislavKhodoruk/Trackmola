import { NgModule } from '@angular/core';
import { ActivityChartComponent } from '@shared/components/activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [ActivityChartComponent],
  imports: [CommonModule, ChartModule ],
  exports: [ActivityChartComponent],
})
export class ActivityChartModule {}

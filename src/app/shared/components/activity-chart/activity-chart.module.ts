import { NgModule } from '@angular/core';
import { ActivityChartContainer } from '@shared/components/activity-chart/activity-chart.container';
import { ActivityChartComponent } from '@shared/components/activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@shared/components/button/button.module';
import { HighchartsChartModule } from "@shared/components/highcharts-chart/highcharts-chart.module";
import { ChartModule } from "angular-highcharts";

@NgModule({
  declarations: [ActivityChartContainer, ActivityChartComponent],
  imports: [CommonModule, ButtonModule, HighchartsChartModule, ChartModule],
  exports: [ActivityChartContainer],
})
export class ActivityChartModule {}

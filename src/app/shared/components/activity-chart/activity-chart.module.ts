import { NgModule } from '@angular/core';
import { ActivityChartComponent } from '@shared/components/activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ActivityChartComponent, ChartModule],
  imports: [CommonModule],
  exports: [ActivityChartComponent],
})
export class ActivityChartModule {}

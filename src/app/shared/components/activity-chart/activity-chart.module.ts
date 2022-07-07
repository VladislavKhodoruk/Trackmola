import { NgModule } from '@angular/core';
import { ActivityChartContainer } from '@shared/components/activity-chart/activity-chart.container';
import { ActivityChartComponent } from '@shared/components/activity-chart/activity-chart.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@shared/components/button/button.module';

@NgModule({
  declarations: [ActivityChartContainer, ActivityChartComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ActivityChartContainer],
})
export class ActivityChartModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartProjectsComponent } from './chart-projects.component';

import { RangeComponent } from './chartRange/range.component';
import { TreemapComponent } from './chartTreemap/treemap.component';
import { DaysComponent } from './days/days.component';
import { LegendComponent } from './legend/legend.component';

import { HighchartsChartModule } from '../highcharts-chart/highcharts-chart.module';
import { ProjectLabelModule } from '../project-label/project-label.module';

@NgModule({
  declarations: [
    ChartProjectsComponent,
    LegendComponent,
    DaysComponent,
    TreemapComponent,
    RangeComponent,
  ],
  exports: [ChartProjectsComponent],
  imports: [CommonModule, ProjectLabelModule, HighchartsChartModule],
})
export class ChartProjectsModule {}

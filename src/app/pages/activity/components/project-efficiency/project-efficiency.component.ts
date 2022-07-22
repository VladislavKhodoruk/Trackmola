import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Options, SeriesOptionsType } from 'highcharts';

import {
  BASIC_OPTIONS_ACTIVITY_CHART_PIE,
  BASIC_OPTIONS_EFFICIENCY_PIE,
} from '@pages/activity/constants/constants';
import { getEfficiency } from '@shared/helpers/helpers';
import { TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-project-efficiency-component',
  templateUrl: 'project-efficiency.component.html',
  styleUrls: ['project-efficiency.scss'],
})
export class ProjectEfficiencyComponent {
  @Input() tasks: TaskTrack[];
  @Input() startOfWeek: number;
  @Input() presentDay: number;

  readonly basicOptions: Options = BASIC_OPTIONS_EFFICIENCY_PIE;

  get seriesData(): SeriesOptionsType[] {
    return [
      {
        type: 'pie',
        data: [
          {
            y: getEfficiency(this.tasks, this.startOfWeek, this.presentDay),
            color: 'var(--primary)',
          },
          {
            y: 1 - getEfficiency(this.tasks, this.startOfWeek, this.presentDay),
            color: 'var(--gray)',
          },
        ],
      },
    ];
  }

  efficiency = {
    total: 2,
    complited: 1,
    shortages: 4,
    overtimes: 0,
  };
}

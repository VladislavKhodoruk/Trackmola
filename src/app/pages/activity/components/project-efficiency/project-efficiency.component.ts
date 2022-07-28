import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Options, SeriesOptionsType } from 'highcharts';

import {
  BASIC_OPTIONS_ACTIVITY_CHART_PIE,
  BASIC_OPTIONS_EFFICIENCY_PIE,
} from '@pages/activity/constants/constants';
import { getEfficiency, outOfNorm } from '@shared/helpers/helpers';
import { TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-project-efficiency-component',
  styleUrls: ['project-efficiency.scss'],
  templateUrl: 'project-efficiency.component.html',
})
export class ProjectEfficiencyComponent {
  @Input() tasks: TaskTrack[];
  @Input() startOfWeek: number;
  @Input() presentDay: number;

  readonly basicOptions: Options = BASIC_OPTIONS_EFFICIENCY_PIE;

  get seriesData(): SeriesOptionsType[] {
    outOfNorm(this.tasks);
    if ((this.tasks, this.startOfWeek, this.presentDay)) {
      this.basicOptions.title.text =
        String(
          (
            getEfficiency(this.tasks, this.startOfWeek, this.presentDay) * 100
          ).toFixed(1)
        ) + '%';
      return [
        {
          type: 'pie',
          data: [
            {
              y: getEfficiency(this.tasks, this.startOfWeek, this.presentDay),
              color: 'var(--primary)',
            },
            {
              y:
                1 -
                getEfficiency(this.tasks, this.startOfWeek, this.presentDay),
              color: 'var(--gray)',
            },
          ],
        },
      ];
    } else {
      return [
        {
          type: 'pie',
          data: [
            {
              y: 0,
              color: 'var(--primary)',
            },
          ],
        },
      ];
    }
  }

  efficiency = {
    complited: 1,
    overtimes: 0,
    shortages: 4,
    total: 2,
  };
}

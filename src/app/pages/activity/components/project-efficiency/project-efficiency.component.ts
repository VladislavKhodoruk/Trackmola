import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Options, SeriesOptionsType } from 'highcharts';

import { BASIC_OPTIONS_EFFICIENCY_PIE } from '@pages/activity/constants/constants';
import { Efficiency } from '@pages/activity/interfaces/interfaces';
import { getEfficiency, outOfNorm } from '@shared/helpers/helpers';
import { TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-project-efficiency-component',
  styleUrls: ['project-efficiency.scss'],
  templateUrl: 'project-efficiency.component.html',
})
export class ProjectEfficiencyComponent implements OnChanges {
  @Input() tasks: TaskTrack[];
  @Input() startOfWeek: number;
  @Input() presentDay: number;

  readonly basicOptions: Options = BASIC_OPTIONS_EFFICIENCY_PIE;

  public efficiency: Efficiency;
  public efficiencyIndex: string;

  get seriesData(): SeriesOptionsType[] {
    if ((this.tasks, this.startOfWeek, this.presentDay)) {
      return [
        {
          data: [
            {
              color: 'var(--primary)',
              y: getEfficiency(this.tasks, this.startOfWeek, this.presentDay),
            },
            {
              color: 'var(--gray)',
              y:
                1 -
                getEfficiency(this.tasks, this.startOfWeek, this.presentDay),
            },
          ],
          type: 'pie',
        },
      ];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tasks) {
      this.efficiency = {
        completed: outOfNorm(this.tasks, this.presentDay).working,
        overtimes: outOfNorm(this.tasks, this.presentDay).overtimes,
        shortages: outOfNorm(this.tasks, this.presentDay).shortages,
      };
      this.efficiencyIndex =
        String(
          (
            getEfficiency(this.tasks, this.startOfWeek, this.presentDay) * 100
          ).toFixed(1)
        ) + '%';
    }
  }
}

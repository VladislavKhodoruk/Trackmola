import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Options, SeriesOptionsType } from 'highcharts';

import {
  DataForChartXRange,
  TaskForManager,
} from '@pages/dashboard/interfaces/interface';
import { managerDashboardChartXRange } from '@shared/constants/constants';
import { ChartType } from '@shared/enums/enum';
import {
  daysInPeriod,
  getPeriodUTC,
  taskTracksByPeriods,
  taskTracksByUser,
  weeksInPeriod,
} from '@shared/helpers/helpers';
import {
  Period,
  TaskTrack,
  User,
  Task,
  GroupBy,
  TaskTracksByUser,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-range',
  styleUrls: ['./range.component.scss'],
  templateUrl: './range.component.html',
})
export class RangeComponent implements OnChanges {
  @Input() readonly activeTask: TaskForManager;
  @Input() readonly tasks: TaskForManager[];
  @Input() readonly period: Period;
  @Input() readonly minWidth: number;
  @Input() readonly marginRight: number;
  @Input() readonly chartXRangeHeight: number;
  @Input() readonly colors: GroupBy<string>;
  @Input() readonly users: GroupBy<User>;

  taskTracksByUserFromTasks: TaskTracksByUser[][];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks && this.tasks.length) {
      this.taskTracksByUserFromTasks = this.tasks.map((task) =>
        taskTracksByUser(task.taskTracksInTask)
      );
    }
  }

  protected get chartXRangeWidth(): number {
    const weeks: number = weeksInPeriod(this.period);
    return this.minWidth * weeks;
  }

  protected get taskTracksByUserFromActiveTask(): TaskTracksByUser[] {
    if (this.activeTask) {
      return taskTracksByUser(this.activeTask.taskTracksInTask);
    }
  }

  protected get basicOptionsChartXRange(): Options {
    const color = 'var(--pale-blue)';
    const weekendsDays = daysInPeriod(this.period).weekends.map((day) => ({
      color,
      ...day,
    }));

    return managerDashboardChartXRange({
      height: this.chartXRangeHeight,
      marginRight: this.marginRight,
      period: getPeriodUTC(this.period),
      weekDays: weekendsDays,
      width: this.chartXRangeWidth,
    });
  }

  protected dataXRangeAllTasks(
    taskTracks: TaskTracksByUser
  ): SeriesOptionsType[] {
    return [
      {
        data: this.dataForChartXRange(taskTracks),
        type: ChartType.Xrange,
      },
    ];
  }

  private dataForChartXRange(
    taskTracks: TaskTracksByUser
  ): DataForChartXRange[] {
    const userId: User['id'] = taskTracks.userId;
    const taskId: Task['id'] = taskTracks.taskTracks[0].taskId;
    const taskTracksSortedByPeriods: [TaskTrack?][] = taskTracksByPeriods(
      taskTracks.taskTracks
    );

    return taskTracksSortedByPeriods.map((taskTrackByPeriod) => {
      const dateStart: Date = new Date(
        taskTrackByPeriod.at(0).date.seconds * 1000
      );
      const dateFinish: Date = new Date(
        taskTrackByPeriod.at(-1).date.seconds * 1000
      );

      const dateFrom: number = Date.UTC(
        dateStart.getFullYear(),
        dateStart.getMonth(),
        dateStart.getDate()
      );
      const dateTo: number = Date.UTC(
        dateFinish.getFullYear(),
        dateFinish.getMonth(),
        dateFinish.getDate() + 1
      );

      const userInfo: User = this.users[userId];

      return {
        color: this.colors[taskId],
        custom: {
          duration: taskTrackByPeriod.reduce(
            (allDuration, { duration }) => (allDuration += duration),
            0
          ),
          userName: userInfo.fullName,
          userPhoto: userInfo.photo,
        },
        x: dateFrom,
        x2: dateTo,
        y: 0,
      };
    });
  }
}

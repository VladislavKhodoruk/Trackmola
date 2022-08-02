import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Options, SeriesOptionsType } from 'highcharts';

import {
  managerDashboardChartXRange,
  MANAGER_DASHBOARD_CHART_TREEMAP,
} from '@pages/dashboard/constants/constants';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import {
  daysInPeriod,
  isWeekend,
  taskTracksByPeriods,
  taskTracksByUser,
  weeksInPeriod,
} from '@pages/dashboard/helpers/helpers';
import {
  DataForChartTreemap,
  DataForChartXRange,
  DaysByPeriod,
  TaskForManager,
} from '@pages/dashboard/interfaces/interface';
import { COLORS_FOR_TASKS } from '@shared/constants/constants';
import { ChartType } from '@shared/enums/enum';
import { getPeriodUTC, getRandomColor } from '@shared/helpers/helpers';

import {
  GroupBy,
  Period,
  Project,
  TaskTrack,
  User,
  Task,
  Vacations,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard',
  styleUrls: ['./manager-dashboard.component.scss'],
  templateUrl: './manager-dashboard.component.html',
})
export class ManagerDashboardComponent implements OnChanges {
  @Input() readonly vacations: Vacations[];
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;
  @Input() readonly usersInfoByUserId: GroupBy<User>;
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly period: Period;

  @Output() selectTask = new EventEmitter<TaskForManager>();

  chartXRangeMarginRight = 24;
  minChartXRangeWidth = 800;
  chartXRangeHeight = 65;

  managerDashboardView = ManagerDashboardView;
  tasksColors: GroupBy<string>;
  basicOptionsChartTreemap = MANAGER_DASHBOARD_CHART_TREEMAP;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasksForManager && this.tasksForManager.length) {
      this.tasksColors = this.tasksForManager.reduce(
        (accum, task, index) => ({
          ...accum,
          [task.id]: COLORS_FOR_TASKS[index],
        }),
        {}
      );
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
      marginRight: this.chartXRangeMarginRight,
      period: getPeriodUTC(this.period),
      weekDays: weekendsDays,
      width: this.chartXRangeWidth,
    });
  }

  protected isWeekend(day: number): boolean {
    return isWeekend(day);
  }

  protected get daysInPeriod(): DaysByPeriod {
    return daysInPeriod(this.period);
  }

  protected get chartXRangeWidth(): number {
    const weeks: number = weeksInPeriod(this.period);
    return this.minChartXRangeWidth * weeks;
  }

  protected getTaskTracksByUser(
    taskTracks: TaskTrack[]
  ): [string, TaskTrack[]][] {
    return taskTracksByUser(taskTracks);
  }

  protected get dataChartTreemap(): SeriesOptionsType[] {
    let taskTracks: TaskForManager['taskTracksInTask'];
    let totalDuration: TaskForManager['durationInTask'];
    let dataForChart: DataForChartTreemap[];

    if (this.activeTask) {
      taskTracks = this.activeTask.taskTracksInTask;
      totalDuration = this.activeTask.durationInTask;
      dataForChart = this.dataForChartTreemap(taskTracks, totalDuration);
    } else {
      taskTracks = this.tasksForManager.flatMap(
        (taskTrack) => taskTrack.taskTracksInTask
      );

      totalDuration = taskTracks.reduce(
        (result, { duration }) => (result += duration),
        0
      );
      dataForChart = this.dataForChartTreemap(taskTracks, totalDuration);
    }

    return [
      {
        data: dataForChart,
        type: ChartType.Treemap,
      },
    ];
  }

  private dataForChartTreemap(
    taskTracks: TaskForManager['taskTracksInTask'],
    duration: TaskForManager['durationInTask']
  ): DataForChartTreemap[] {
    const usersGroupByDuration: GroupBy<number> = taskTracks.reduce(
      (accum, taskTrack) => {
        const userId: User['id'] = taskTrack.userId;
        if (!accum[userId]) {
          accum[userId] = 0;
        }
        accum[userId] += taskTrack.duration;
        return accum;
      },
      {}
    );
    return Object.entries(usersGroupByDuration).map(([userId, userTime]) => {
      const userPercent: number = (userTime * 100) / duration;
      const userName: string = this.usersInfoByUserId[userId].fullName;
      return {
        color: getRandomColor(),
        id: userId,
        name: userName,
        value: userPercent,
      };
    });
  }

  protected dataXRangeAllTasks(
    taskTracks: [string, TaskTrack[]]
  ): SeriesOptionsType[] {
    return [
      {
        data: this.dataForChartXRange(taskTracks),
        type: ChartType.Xrange,
      },
    ];
  }

  private dataForChartXRange(
    taskTracks: [string, TaskTrack[]]
  ): DataForChartXRange[] {
    const userId: User['id'] = taskTracks[0];
    const taskId: Task['id'] = taskTracks[1][0].taskId;
    const test: [TaskTrack?][] = taskTracksByPeriods(taskTracks[1]);

    return test.map((taskTrackByPeriod) => {
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

      const userInfo: User = this.usersInfoByUserId[userId];

      return {
        color: this.tasksColors[taskId],
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

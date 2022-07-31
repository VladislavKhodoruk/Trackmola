import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { SeriesOptionsType } from 'highcharts';

import {
  managerDashboardChartXRange,
  MANAGER_DASHBOARD_CHART_TREEMAP,
} from '@pages/dashboard/constants/constants';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import {
  DataForChartTreemap,
  DataForChartXRange,
  TaskForManager,
} from '@pages/dashboard/interfaces/interface';
import {
  COLORS_FOR_TASKS,
  ONE_DAY_IN_SECONDS,
  ONE_WEEK_IN_SECONDS,
} from '@shared/constants/constants';
import { getPeriodUTC, getWeekendsFromPeriod } from '@shared/helpers/helpers';

import {
  GroupBy,
  Period,
  Project,
  TaskTrack,
  User,
  Vacations,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard',
  styleUrls: ['./manager-dashboard.component.scss'],
  templateUrl: './manager-dashboard.component.html',
})
export class ManagerDashboardComponent {
  @Input() readonly vacations: Vacations[];
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;
  @Input() readonly usersInfoByUserId: GroupBy<User>;
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly period: Period;

  @Output() selectTask = new EventEmitter<TaskForManager>();

  managerDashboardView = ManagerDashboardView;
  tasksColors: string[] = [];
  basicOptionsChartTreemap = MANAGER_DASHBOARD_CHART_TREEMAP;

  constructor() {
    this.tasksColors = COLORS_FOR_TASKS.reduce(
      (accum: string[], color: string) => [...accum, color],
      []
    );
  }

  protected get basicOptionsChartXRange() {
    const periodType: number =
      (new Date(this.period.end).getTime() -
        new Date(this.period.start).getTime()) /
      ONE_WEEK_IN_SECONDS;

    const weekends: {
      color: string;
      from: number;
      to: number;
    }[] = getWeekendsFromPeriod(this.period).map(({ from, to }) => {
      const backGroundColor = 'var(--pale-blue)';
      return {
        color: backGroundColor,
        from,
        to,
      };
    });

    return managerDashboardChartXRange({
      minWidthScroll: periodType < 1 ? 800 : periodType < 2 ? 1500 : 3000,
      period: getPeriodUTC(this.period),
      weekDays: weekends,
    });
  }

  protected get dataXRange(): SeriesOptionsType[] {
    let taskTracks: TaskForManager['taskTracksInTask'];
    let dataForChart: DataForChartXRange[];

    if (this.activeTask) {
      taskTracks = this.activeTask.taskTracksInTask;
      dataForChart = this.dataForChartXRange(taskTracks);
    } else {
      taskTracks = this.tasksForManager
        .flatMap((taskTrack) => taskTrack.taskTracksInTask)
        .sort((a, b) => a.date.seconds - b.date.seconds);

      dataForChart = this.dataForChartXRange(taskTracks);
    }

    return [
      {
        data: dataForChart,
        type: 'xrange',
      },
    ];
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
        type: 'treemap',
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
    return Object.entries(usersGroupByDuration).map(
      ([userId, userTime], index) => {
        const userPercent: number = (userTime * 100) / duration;
        const userName: string = this.usersInfoByUserId[userId].fullName;
        return {
          color: this.tasksColors[index],
          id: userId,
          name: userName,
          value: userPercent,
        };
      }
    );
  }

  private dataForChartXRange(
    taskTracks: TaskForManager['taskTracksInTask']
  ): DataForChartXRange[] {
    const taskTracksGroupByUser: GroupBy<TaskTrack[]> = taskTracks.reduce(
      (accum: GroupBy<TaskTrack[]>, taskTrack: TaskTrack) => {
        const userId = taskTrack.userId;
        if (!accum[userId]) {
          accum[userId] = [];
        }
        accum[userId].push(taskTrack);
        return accum;
      },
      {}
    );

    return Object.entries(taskTracksGroupByUser).flatMap(
      ([userId, userTaskTracks], index) => {
        const userInfo: User = this.usersInfoByUserId[userId];
        return this.userTaskTracksByPeriods(userTaskTracks).map((taskTrack) => {
          const dateStart = new Date(taskTrack[0].date.seconds * 1000);
          const dateFinish = new Date(
            taskTrack[taskTrack.length - 1].date.seconds * 1000
          );

          return {
            custom: {
              duration: taskTrack.reduce(
                (allDuration, { duration }) => (allDuration += duration),
                0
              ),
              userName: userInfo.fullName,
              userPhoto: userInfo.photo,
            },
            x: Date.UTC(
              dateStart.getFullYear(),
              dateStart.getMonth(),
              dateStart.getDate()
            ),
            x2: Date.UTC(
              dateFinish.getFullYear(),
              dateFinish.getMonth(),
              dateFinish.getDate() + 1
            ),
            y: index,
          };
        });
      }
    );
  }

  private compareDates(dateFirst: number, dateSecond: number): boolean {
    const date = new Date(dateFirst * 1000);
    const date2 = new Date(dateSecond * 1000);
    const dateUTC = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const date2UTC = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    return dateUTC !== date2UTC && dateUTC !== date2UTC + ONE_DAY_IN_SECONDS;
  }

  private userTaskTracksByPeriods(taskTracks: TaskTrack[]): [TaskTrack?][] {
    return taskTracks.reduce(
      (
        accum: [TaskTrack?][],
        value: TaskTrack,
        i: number,
        array: TaskTrack[]
      ) => {
        if (
          !i ||
          this.compareDates(value.date.seconds, array[i - 1].date.seconds)
        ) {
          accum.push([]);
        }
        accum[accum.length - 1].push(value);
        return accum;
      },
      []
    );
  }
}

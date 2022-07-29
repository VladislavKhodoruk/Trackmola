import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { SeriesOptionsType } from 'highcharts';

import {
  MANAGER_DASHBOARD_CHART_TREEMAP,
  MANAGER_DASHBOARD_CHART_X_RANGE,
} from '@pages/dashboard/constants/constants';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import {
  DataForChartTreemap,
  TaskForManager,
} from '@pages/dashboard/interfaces/interface';
import { COLORS_FOR_TASKS } from '@shared/constants/constants';
import { getRandomColor } from '@shared/helpers/helpers';

import {
  GroupBy,
  Project,
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

  @Output() selectTask = new EventEmitter<TaskForManager>();

  managerDashboardView = ManagerDashboardView;

  basicOptionsChartTreemap = MANAGER_DASHBOARD_CHART_TREEMAP;
  basicOptionsChartXRange = MANAGER_DASHBOARD_CHART_X_RANGE;

  tasksColors: string[] = [];

  dataXRange: SeriesOptionsType[] = [
    {
      data: [
        {
          custom: {
            duration: '1',
            userName: 'Andrei2',
            userPhoto: 'https://avatars.githubusercontent.com/u/88663763?v=4',
          },
          x: Date.UTC(2014, 10, 21),
          x2: Date.UTC(2014, 11, 2),
          y: 0,
        },
        {
          custom: {
            duration: '1',
            userName: 'Andrei2',
            userPhoto: 'https://avatars.githubusercontent.com/u/88663763?v=4',
          },
          x: Date.UTC(2014, 11, 2),
          x2: Date.UTC(2014, 11, 5),
          y: 1,
        },
        {
          custom: {
            duration: '1',
            userName: 'Andrei2',
            userPhoto: 'https://avatars.githubusercontent.com/u/88663763?v=4',
          },
          x: Date.UTC(2014, 11, 8),
          x2: Date.UTC(2014, 11, 9),
          y: 2,
        },
        {
          custom: {
            duration: '1',
            userName: 'Andrei2',
            userPhoto: 'https://avatars.githubusercontent.com/u/88663763?v=4',
          },
          x: Date.UTC(2014, 11, 9),
          x2: Date.UTC(2014, 11, 19),
          y: 1,
        },
        {
          custom: {
            duration: '1',
            userName: 'Andrei2',
            userPhoto: 'https://avatars.githubusercontent.com/u/88663763?v=4',
          },
          x: Date.UTC(2014, 11, 10),
          x2: Date.UTC(2014, 11, 23),
          y: 3,
        },
      ],
      type: 'xrange',
    },
  ];

  constructor() {
    [...COLORS_FOR_TASKS].forEach(() =>
      this.tasksColors.push(getRandomColor())
    );
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
}

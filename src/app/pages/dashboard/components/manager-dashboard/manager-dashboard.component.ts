import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MANAGER_DASHBOARD_CHART_TREEMAP } from '@pages/dashboard/constants/constants';

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

  @Output() selectTask = new EventEmitter<TaskForManager>();

  basicOptions = MANAGER_DASHBOARD_CHART_TREEMAP;

  tasksColors: string[] = [];

  constructor() {
    [...COLORS_FOR_TASKS].forEach(() =>
      this.tasksColors.push(getRandomColor())
    );
  }

  protected get data() {
    let taskTracks: TaskForManager['taskTracksInTask'];
    let totalDuration: TaskForManager['durationInTask'];
    let dataForChart: DataForChartTreemap[];

    if (this.activeTask) {
      taskTracks = this.activeTask.taskTracksInTask;
      totalDuration = this.activeTask.durationInTask;

      dataForChart = this.dataForChart(taskTracks, totalDuration);
    } else {
      taskTracks = this.tasksForManager.flatMap(
        (taskTrack) => taskTrack.taskTracksInTask
      );

      totalDuration = taskTracks.reduce(
        (result, { duration }) => (result += duration),
        0
      );
      dataForChart = this.dataForChart(taskTracks, totalDuration);
    }

    return [
      {
        data: dataForChart,
        type: 'treemap',
      },
    ];
  }

  private dataForChart(
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

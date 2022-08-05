import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SeriesOptionsType } from 'highcharts';

import { MANAGER_DASHBOARD_CHART_TREEMAP } from '@pages/dashboard/constants/constants';
import {
  DataForChartTreemap,
  TaskForManager,
} from '@pages/dashboard/interfaces/interface';
import { ChartType } from '@shared/enums/enum';
import { GroupBy, User } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-treemap',
  styleUrls: ['./treemap.component.scss'],
  templateUrl: './treemap.component.html',
})
export class TreemapComponent {
  @Input() readonly tasks: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;
  @Input() readonly users: User[];

  basicOptionsChartTreemap = MANAGER_DASHBOARD_CHART_TREEMAP;

  protected get dataChartTreemap(): SeriesOptionsType[] {
    let taskTracks: TaskForManager['taskTracksInTask'];
    let totalDuration: TaskForManager['durationInTask'];
    let dataForChart: DataForChartTreemap[];

    if (this.activeTask) {
      taskTracks = this.activeTask.taskTracksInTask;
      totalDuration = this.activeTask.durationInTask;
      dataForChart = this.dataForChartTreemap(taskTracks, totalDuration);
    } else {
      taskTracks = this.tasks.flatMap(
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
    const usersGroupByDurationArray = Object.entries(usersGroupByDuration);

    return usersGroupByDurationArray.map(([userId, userTime]) => {
      const userPercent: number = (userTime * 100) / duration;
      const user: User = this.users[userId];
      return {
        id: userId,
        name: user.fullName,
        value: userPercent,
      };
    });
  }
}

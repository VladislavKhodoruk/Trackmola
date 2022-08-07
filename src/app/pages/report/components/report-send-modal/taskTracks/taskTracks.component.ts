import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ONE_WEEK_IN_SECONDS } from '@shared/constants/constants';

import { GroupBy, TaskTrack, Period } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-tasktracks',
  styleUrls: ['./tasktracks.component.scss'],
  templateUrl: './tasktracks.component.html',
})
export class TaskTracksComponent {
  @Input() period!: Period;
  @Input() projectsInfoByProjectId!: GroupBy<any>;
  @Input() tasksInfoByTaskId!: GroupBy<any>;
  @Input() taskTracks!: TaskTrack[];

  getFilteredTasksTracks(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
        curTaskTrack.date.seconds * 1000 >=
          this.period.start - ONE_WEEK_IN_SECONDS &&
        curTaskTrack.date.seconds * 1000 <= this.period.end
    );
  }

  protected groupByDate(taskTracks: TaskTrack[]): [string, TaskTrack[]][] {
    this.taskTracks = this.getFilteredTasksTracks();
    const taskTracksGroupByDate: GroupBy<TaskTrack[]> = taskTracks.reduce(
      (accum: GroupBy<TaskTrack[]>, taskTrack: TaskTrack) => {
        const date = taskTrack.date.seconds * 1000;
        if (!accum[date]) {
          accum[date] = [];
        }
        accum[date].push(taskTrack);
        return accum;
      },
      {}
    );
    return Object.entries(taskTracksGroupByDate).sort((a, b) => +b[0] - +a[0]);
  }
}

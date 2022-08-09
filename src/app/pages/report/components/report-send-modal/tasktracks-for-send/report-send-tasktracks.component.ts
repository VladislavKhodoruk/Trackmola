import { Component, Input } from '@angular/core';

import fireIcon from '@iconify/icons-emojione/fire';

import { ONE_WEEK_IN_SECONDS } from '@shared/constants/constants';

import { GroupBy, TaskTrack, Period } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-report-send-tasktracks',
  styleUrls: ['./report-send-tasktracks.component.scss'],
  templateUrl: './report-send-tasktracks.component.html',
})
export class TaskTracksComponent {
  @Input() period!: Period;
  @Input() projectsInfoByProjectId!: GroupBy<any>;
  @Input() tasksInfoByTaskId!: GroupBy<any>;
  @Input() taskTracks!: TaskTrack[];

  readonly fireIcon = fireIcon;

  getFilteredTasksTracks(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
        curTaskTrack.date.seconds * 1000 >=
          this.period.start - ONE_WEEK_IN_SECONDS &&
        curTaskTrack.date.seconds * 1000 <= this.period.end
    );
  }

  protected groupByDate(): any {
    this.taskTracks = this.getFilteredTasksTracks();
    const taskTracksGroupByDate: GroupBy<TaskTrack[]> = this.taskTracks.reduce(
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

    return Object.keys(taskTracksGroupByDate).map((data) => ({
      date: data,
      tasks: taskTracksGroupByDate[data],
    }));
  }
}

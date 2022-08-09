import { Component, Input } from '@angular/core';

import fireIcon from '@iconify/icons-emojione/fire';

import { getFilteredTasksTracksByPeriod } from '@shared/helpers/helpers';

import {
  GroupBy,
  TaskTrack,
  Period,
  Task,
  Project,
} from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-report-send-tasktracks',
  styleUrls: ['./report-send-tasktracks.component.scss'],
  templateUrl: './report-send-tasktracks.component.html',
})
export class TaskTracksComponent {
  @Input() period!: Period;
  @Input() projectsInfoByProjectId!: GroupBy<Project>;
  @Input() tasksInfoByTaskId!: GroupBy<Task>;
  @Input() taskTracks!: TaskTrack[];

  readonly fireIcon = fireIcon;

  protected groupByDate(): any {
    this.taskTracks = getFilteredTasksTracksByPeriod(
      this.taskTracks,
      this.period
    );
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

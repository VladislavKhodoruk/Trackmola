import { Component, Input } from '@angular/core';

import checkIcon from '@iconify/icons-tabler/check';

import { IconifyIcon } from '@iconify/types';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';

import {
  GroupBy,
  Project,
  TaskTrack,
  Task,
} from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-tasks-users',
  templateUrl: './active-tasks-users.component.html',
  styleUrls: ['./active-tasks-users.component.scss'],
})
export class ActiveTasksUsersComponent {
  @Input() readonly project: Project;
  @Input() readonly activeUserGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksGroupByUser: GroupBy<TaskTrack[]>;
  @Input() readonly tasksInfoByTaskId: GroupBy<Task>;

  readonly toggleLabels: string[] = [PeriodType.Week, PeriodType.Month];
  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconCheck: IconifyIcon = checkIcon;

  aprove(event: Event) {
    event.stopPropagation();
    return null;
  }

  protected groupByDate(taskTracks: TaskTrack[]): [string, TaskTrack[]][] {
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

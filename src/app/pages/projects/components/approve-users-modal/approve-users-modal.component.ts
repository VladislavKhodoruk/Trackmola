import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import checkIcon from '@iconify/icons-tabler/check';
import x from '@iconify/icons-tabler/x';

import { IconifyIcon } from '@iconify/types';

import {
  DEFAULT_PHOTO_URL,
  ONE_WEEK_IN_SECONDS,
} from '@shared/constants/constants';

import {
  GroupBy,
  Period,
  Project,
  TaskTrack,
  Task,
  User,
} from '@shared/interfaces/interfaces';

@Component({
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,

      useValue: { overlayPanelClass: 'modalApproveUser' },
    },
  ],
  selector: 'app-approve-users-modal',
  styleUrls: ['./approve-users-modal.component.scss'],
  templateUrl: './approve-users-modal.component.html',
})
export class ApproveUsersModalComponent {
  @Input() taskTracks!: TaskTrack[];
  @Input() currentDate!: number;
  @Input() period!: Period;
  @Input() readonly project: Project;
  @Input() user: User;
  @Input() readonly sendedTaskTracksGroupByUser: GroupBy<TaskTrack[]>;
  @Input() readonly activeUserGroupByProject: GroupBy<Task[]>;
  @Input() readonly tasksInfoByTaskId: GroupBy<Task>;
  @Input() readonly activeTaskTracksGroupByUser: GroupBy<TaskTrack[]>;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack = new EventEmitter<TaskTrack[]>();

  iconX = x;
  panelOpenState = false;
  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconCheck: IconifyIcon = checkIcon;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  protected getFilteredTasksTracks(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
        curTaskTrack.date.seconds * 1000 >=
          this.period.start - ONE_WEEK_IN_SECONDS &&
        curTaskTrack.date.seconds * 1000 <= this.period.end
    );
  }

  protected groupByDate(taskTracks: TaskTrack[]): [string, TaskTrack[]][] {
    const taskTracksGroupByDate: GroupBy<TaskTrack[]> = taskTracks.reduce(
      (accum: GroupBy<TaskTrack[]>, taskTrack: TaskTrack) => {
        if (taskTrack.projectId !== this.project.id) {
          return accum;
        }
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

  approveReport(): void {
    const sendedTaskTracks = this.getFilteredTasksTracks();
    const sendedTasksTrack: TaskTrack[] = sendedTaskTracks.map((taskTrack) => ({
      ...taskTrack,
      taskTrackStatus: 'approved',
    }));
    this.submitTasksTrack.emit(sendedTasksTrack);
  }
  approveUsersTracks(): void {
    const tracksByUser = this.taskTracks.filter(
      (taskTrack) => taskTrack.userId === this.data.userId
    );
    const sendedTasksTrack: TaskTrack[] = tracksByUser.map((taskTrack) => ({
      ...taskTrack,
      taskTrackStatus: 'approved',
    }));
    this.submitTasksTrack.emit(sendedTasksTrack);
  }
}

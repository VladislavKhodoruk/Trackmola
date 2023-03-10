import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import fireIcon from '@iconify/icons-emojione/fire';
import checkIcon from '@iconify/icons-tabler/check';
import x from '@iconify/icons-tabler/x';

import { IconifyIcon } from '@iconify/types';

import {
  DEFAULT_PHOTO_URL,
  ONE_WEEK_IN_SECONDS,
} from '@shared/constants/constants';
import { TaskTackStatus } from '@shared/enums/enum';

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
  @Input() readonly taskTracks!: TaskTrack[];
  @Input() readonly currentDate!: number;
  @Input() readonly period!: Period;
  @Input() readonly project: Project;
  @Input() readonly user: User;
  @Input() readonly sendedTaskTracksGroupByUser: GroupBy<TaskTrack[]>;
  @Input() readonly activeUserGroupByProject: GroupBy<Task[]>;
  @Input() readonly tasksInfoByTaskId: GroupBy<Task>;
  @Input() readonly activeTaskTracksGroupByUser: GroupBy<TaskTrack[]>;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack = new EventEmitter<TaskTrack[]>();

  readonly iconX: IconifyIcon = x;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconCheck: IconifyIcon = checkIcon;
  readonly iconFire: IconifyIcon = fireIcon;

  openModal = true;
  panelOpenState = false;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: { userId: string }
  ) {}

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

  approveUsersTracks(): void {
    const tracksByUser = this.taskTracks.filter(
      (taskTrack) => taskTrack.userId === this.data.userId
    );
    const sendedTasksTrack: TaskTrack[] = tracksByUser.map((taskTrack) => ({
      ...taskTrack,
      taskTrackStatus: TaskTackStatus.Approved,
    }));
    this.submitTasksTrack.emit(sendedTasksTrack);
    this.openModal = false;
  }
}

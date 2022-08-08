import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import checkIcon from '@iconify/icons-tabler/check';

import { IconifyIcon } from '@iconify/types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { take, filter } from 'rxjs';

import { ApproveUsersModalContainer } from '../approve-users-modal/approve-users-modal.container';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { PeriodType } from '@shared/enums/enum';

import {
  GroupBy,
  Project,
  TaskTrack,
  Task,
  User,
} from '@shared/interfaces/interfaces';

@UntilDestroy()
@Component({
  selector: 'app-active-tasks-users',
  styleUrls: ['./active-tasks-users.component.scss'],
  templateUrl: './active-tasks-users.component.html',
})
export class ActiveTasksUsersComponent {
  @Input() readonly project: Project;
  @Input() readonly activeUserGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksGroupByUser: GroupBy<TaskTrack[]>;
  @Input() readonly sendedTaskTracksGroupByUser: GroupBy<TaskTrack[]>;
  @Input() readonly tasksInfoByTaskId: GroupBy<Task>;
  @Input() taskTracks!: TaskTrack[];

  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  readonly toggleLabels: string[] = [PeriodType.Week, PeriodType.Month];
  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconCheck: IconifyIcon = checkIcon;

  constructor(public dialog: MatDialog) {}

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

  openModal(userId: string, event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ApproveUsersModalContainer, {
      autoFocus: false,
      data: { userId },
      panelClass: 'modalApprove',
    });
    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        take(1),
        filter((item) => !!item)
      )
      .subscribe((task: Task) => {
        this.addTask.emit(task);
      });
  }

  getUserStatus(user: User): string {
    const tracksByUser = this.taskTracks.filter(
      (taskTrack) => taskTrack.userId === user.id
    );
    return tracksByUser[0]?.taskTrackStatus || 'new';
  }
}

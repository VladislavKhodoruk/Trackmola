import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';
import fileZip from '@iconify/icons-tabler/file-zip';
import pencilIcon from '@iconify/icons-tabler/pencil';
import questionMark from '@iconify/icons-tabler/question-mark';

import { IconifyIcon } from '@iconify/types';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { filter, take } from 'rxjs';

import { TaskInputComponent } from './task-input/task-input.component';

import { AddTasktrackDialogContainer } from '@shared/components/add-tasktrack-dialog/add-tasktrack-dialog.container';

import {
  DEFAULT_PHOTO_URL,
  dialogOpeningTime,
} from '@shared/constants/constants';
import { UserType } from '@shared/enums/enum';
import { urlReplacer } from '@shared/helpers/helpers';
import {
  GroupBy,
  Project,
  TaskTrack,
  Task,
  User,
} from '@shared/interfaces/interfaces';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-active-tasks',
  styleUrls: ['./active-tasks.component.scss'],
  templateUrl: './active-tasks.component.html',
})
export class ActiveTasksComponent {
  @Input() readonly project: Project;
  @Input() readonly activeTaskGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksGroupByTask: GroupBy<TaskTrack[]>;
  @Input() readonly usersInfoByUserId: GroupBy<User>;
  @Input() readonly modalView: boolean;

  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconClipboard: IconifyIcon = clipboardPlus;
  readonly iconPencil: IconifyIcon = pencilIcon;
  readonly iconFileZip: IconifyIcon = fileZip;
  readonly iconQuestionMark: IconifyIcon = questionMark;

  readonly userType = UserType;
  readonly currentUser: string = localStorage.getItem('AuthUserType');

  constructor(public dialog: MatDialog) {}

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

  protected addToReport(event: Event): void {
    event.stopPropagation();
    return null;
  }

  protected modalAddToReport(
    event: Event,
    projectName: Project['name'],
    taskName: Task['name'],
    enterAnimationDuration: string = dialogOpeningTime
  ): void {
    event.stopPropagation();

    this.dialog.open(AddTasktrackDialogContainer, {
      autoFocus: false,
      data: {
        formTask: {
          projectName,
          taskName,
        },
      },
      enterAnimationDuration,
      panelClass: 'modalAdd',
    });
  }

  protected modalAddTask(
    enterAnimationDuration: string = dialogOpeningTime
  ): void {
    const dialogRef = this.dialog.open(TaskInputComponent, {
      autoFocus: false,
      data: { project: this.project },
      enterAnimationDuration,
      panelClass: 'modalInputTask',
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

  protected searchLink(text: string): string {
    return urlReplacer(text) || 'no comment';
  }
}

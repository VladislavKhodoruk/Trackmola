import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';

import { IconifyIcon } from '@iconify/types';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AddTasktrackDialogContainer } from '@shared/components/add-tasktrack-dialog/add-tasktrack-dialog.container';
import { ActiveTasks } from '@shared/interfaces/interfaces';

@UntilDestroy()
@Component({
  selector: 'app-active-task-item',
  templateUrl: 'active-task-item.component.html',
  styleUrls: ['active-task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTaskItemComponent {
  @Input() currentTask!: ActiveTasks;

  readonly clipButton: IconifyIcon = clipboardPlus;
  duration = 1;

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string): void {
    this.dialog.open(AddTasktrackDialogContainer, {
      panelClass: 'modal',
      enterAnimationDuration,
      data: { formTask: this.currentTask },
    });
  }
}

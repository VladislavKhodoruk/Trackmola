import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';

import { IconifyIcon } from '@iconify/types';

import { UntilDestroy } from '@ngneat/until-destroy';

import { AddTasktrackDialogContainer } from '@shared/components/add-tasktrack-dialog/add-tasktrack-dialog.container';
import { dialogOpeningTime } from '@shared/constants/constants';
import { ActiveTasks } from '@shared/interfaces/interfaces';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-active-task-item',
  styleUrls: ['active-task-item.component.scss'],
  templateUrl: 'active-task-item.component.html',
})
export class ActiveTaskItemComponent {
  @Input() currentTask!: ActiveTasks;

  readonly clipButton: IconifyIcon = clipboardPlus;

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string = dialogOpeningTime): void {
    this.dialog.open(AddTasktrackDialogContainer, {
      data: { formTask: this.currentTask },
      enterAnimationDuration,
      panelClass: 'modal',
    });
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import fireIcon from '@iconify/icons-emojione/fire';
import pencil from '@iconify/icons-tabler/pencil';
import trash from '@iconify/icons-tabler/trash';
import { IconifyIcon } from '@iconify/types';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ModalComponent } from '../modal/modal.component';

import { dialogOpeningTime } from '@shared/constants/constants';
import { TaskItem } from '@shared/interfaces/interfaces';

@UntilDestroy()
@Component({
  selector: 'app-task',
  styleUrls: ['./task.component.scss'],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() taskItem!: TaskItem | null;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  readonly iconTrash: IconifyIcon = trash;
  readonly iconPencil: IconifyIcon = pencil;
  readonly iconFire: IconifyIcon = fireIcon;

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string = dialogOpeningTime): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      enterAnimationDuration,
      panelClass: 'modal',
    });
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.delete.emit(this.taskItem?.id);
        }
      });
  }
}

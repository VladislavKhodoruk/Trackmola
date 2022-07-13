import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import pencil from '@iconify/icons-tabler/pencil';
import trash from '@iconify/icons-tabler/trash';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ModalComponent } from '../modal/modal.component';

import { TaskItem } from '@shared/interfaces/interfaces';

@UntilDestroy()
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() taskItem!: TaskItem | null;

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  iconTrash = trash;
  iconPencil = pencil;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);
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

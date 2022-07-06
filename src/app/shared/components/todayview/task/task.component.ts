import { TasksService } from '@shared/services/tasks.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import trash from '@iconify/icons-tabler/trash';
import pencil from '@iconify/icons-tabler/pencil';
import { TaskItem } from '@shared/interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnChanges {
  @Input() taskItem!: TaskItem | null;
  trash = trash;
  pencil = pencil;

  onDeleteClick() {
    this.taskService.removeTask(this.taskItem.id);
  }

  constructor(private taskService: TasksService, public dialog: MatDialog) {} //public dialog: MatDialog

  ngOnChanges(changes: SimpleChanges): void {}

  openDialog() {
    let dialogRef = this.dialog.open(ModalComponent);
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.onDeleteClick();
        }
      });
  }
}

// openDialog() {
//   this.dialog.open(ModalComponent, { id: this.taskItem.id });

//   //1
//   // let dialogRef = this.dialog.open(ModalComponent, {
//   //   height: '14rem',
//   //   width: '26rem',
//   // });

//   //2
//   //dialogRef.updateSize('26rem', '14rem');

//   //3
//   //this.dialog.open(ModalComponent, { panelClass: 'my-class' });
// }

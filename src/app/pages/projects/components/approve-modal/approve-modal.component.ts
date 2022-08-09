import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import x from '@iconify/icons-tabler/x';

import { IconifyIcon } from '@iconify/types';

import { ApproveModalContainer } from './approve-modal.container';

import { TaskTackStatus } from '@shared/enums/enum';

import { TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-approve-modal',
  styleUrls: ['./approve-modal.component.scss'],
  templateUrl: './approve-modal.component.html',
})
export class ApproveModalComponent {
  @Input() readonly taskTracks!: TaskTrack[];
  @Input() readonly currentDate!: number;

  @Output() taskTrack: EventEmitter<TaskTrack> = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack: EventEmitter<TaskTrack[]> = new EventEmitter<
    TaskTrack[]
  >();

  readonly iconX: IconifyIcon = x;

  panelOpenState = false;
  openModal = true;

  constructor(public dialogRef: MatDialogRef<ApproveModalContainer>) {}

  protected approveReport(): void {
    const filteredTasksTracks = this.taskTracks?.filter(
      (taskTrack) => taskTrack.taskTrackStatus === TaskTackStatus.Sended
    );

    const approvedTasksTrack: TaskTrack[] = filteredTasksTracks.map(
      (taskTrack) => ({
        ...taskTrack,
        taskTrackStatus: TaskTackStatus.Approved,
      })
    );

    this.submitTasksTrack.emit(approvedTasksTrack);

    this.openModal = false;
  }
}

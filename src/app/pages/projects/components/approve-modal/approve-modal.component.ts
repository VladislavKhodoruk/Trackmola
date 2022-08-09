import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import x from '@iconify/icons-tabler/x';

import { getFilteredTasksTracksByPeriod } from '@shared/helpers/helpers';

import { Period, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,

      useValue: { overlayPanelClass: 'modalApprove' },
    },
  ],
  selector: 'app-approve-modal',
  styleUrls: ['./approve-modal.component.scss'],
  templateUrl: './approve-modal.component.html',
})
export class ApproveModalComponent {
  @Input() taskTracks!: TaskTrack[];
  @Input() currentDate!: number;
  @Input() period!: Period;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack = new EventEmitter<TaskTrack[]>();

  iconX = x;
  panelOpenState = false;

  approveReport(): void {
    const sendedTaskTracks = getFilteredTasksTracksByPeriod(
      this.taskTracks,
      this.period
    );
    const sendedTasksTrack: TaskTrack[] = sendedTaskTracks.map((taskTrack) => ({
      ...taskTrack,
      taskTrackStatus: 'approved',
    }));
    this.submitTasksTrack.emit(sendedTasksTrack);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import x from '@iconify/icons-tabler/x';

import { ONE_WEEK_IN_SECONDS } from '@shared/constants/constants';

import { Period, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
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

  getFilteredTasksTracks(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
        curTaskTrack.date.seconds * 1000 >=
          this.period.start - ONE_WEEK_IN_SECONDS &&
        curTaskTrack.date.seconds * 1000 <= this.period.end
    );
  }

  approveReport(): void {
    const sendedTaskTracks = this.getFilteredTasksTracks();
    const sendedTasksTrack: TaskTrack[] = sendedTaskTracks.map((taskTrack) => ({
      ...taskTrack,
      taskTrackStatus: 'approved',
    }));
    this.submitTasksTrack.emit(sendedTasksTrack);
  }
}

import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import x from '@iconify/icons-tabler/x';

import { ONE_WEEK_IN_SECONDS } from '@shared/constants/constants';

import {
  Period,
  Project,
  TaskItem,
  TaskTrack,
} from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-report-send-modal',
  styleUrls: ['./report-send-modal.component.scss'],
  templateUrl: './report-send-modal.component.html',
})
export class ReportSendModalComponent {
  @Input() taskTracks!: TaskTrack[];
  @Input() currentDate!: number;
  @Input() period!: Period;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack = new EventEmitter<TaskTrack[]>();
  @Output() addTask: EventEmitter<Task> = new EventEmitter<Task>();

  taskItems: TaskItem[];
  iconX = x;
  panelOpenState = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { project: Project }
  ) {}

  getFilteredTasksTracks(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
        curTaskTrack.date.seconds * 1000 >=
          this.period.start - ONE_WEEK_IN_SECONDS &&
        curTaskTrack.date.seconds * 1000 <= this.period.end
    );
  }

  submitReport(): void {
    const sendedTaskTracks = this.getFilteredTasksTracks();
    const sendedTasksTrack: TaskTrack[] = sendedTaskTracks.map((taskTrack) => ({
      ...taskTrack,
      taskTrackStatus: 'sended',
    }));
    this.submitTasksTrack.emit(sendedTasksTrack);
  }
}

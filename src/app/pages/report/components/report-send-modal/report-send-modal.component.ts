import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import x from '@iconify/icons-tabler/x';

import {
  DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK,
  DEFAULT_PHOTO_URL,
  ONE_WEEK_IN_SECONDS,
} from '@shared/constants/constants';

import {
  Period,
  Project,
  TaskItem,
  TaskTrack,
} from '@shared/interfaces/interfaces';

@Component({
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'reportSendClass' },
    },
  ],
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

  readonly defaultWeekWorkHours = DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK;
  readonly usersInProject = [
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
  ];
  taskItems: TaskItem[];
  iconX = x;
  panelOpenState = false;
  get weekReportDuration() {
    return this.taskTracks
      ?.filter(
        (curTaskTrack) =>
          curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
          curTaskTrack.date.seconds * 1000 >= this.period.start &&
          curTaskTrack.date.seconds * 1000 <= this.period.end
      )
      .reduce((acc, item) => (acc += item.duration), 0);
  }

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

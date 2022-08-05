import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import check from '@iconify/icons-tabler/check';
import { IconifyIcon } from '@iconify/types';

import {
  DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK,
  DEFAULT_PHOTO_URL,
  ONE_WEEK_IN_SECONDS,
} from '@shared/constants/constants';
import { Period, TaskTrack } from '@shared/interfaces/interfaces';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report',
  styleUrls: ['./report.component.scss'],
  templateUrl: './report.component.html',
})
export class ReportComponent {
  @Input() taskTracks!: TaskTrack[];
  @Input() currentDate!: number;
  @Input() period!: Period;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack = new EventEmitter<TaskTrack[]>();

  readonly iconCheck: IconifyIcon = check;

  readonly defaultWeekWorkHours = DEFAULT_NUMBER_OF_HOURS_IN_WORKING_WEEK;

  readonly usersInProject = [
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
    { photo: DEFAULT_PHOTO_URL },
  ];

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

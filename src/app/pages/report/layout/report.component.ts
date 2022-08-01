import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import check from '@iconify/icons-tabler/check';

import { transformDate } from '../helpers/report-input-helpers';

import { TaskTrack } from '@shared/interfaces/interfaces';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-report',
  styleUrls: ['./report.component.scss'],
  templateUrl: './report.component.html',
})
export class ReportComponent {
  @Input() taskTracks!: TaskTrack[];
  @Input() currentDate!: number;

  @Output() taskTrack = new EventEmitter<TaskTrack>();
  @Output() submitTasksTrack = new EventEmitter<TaskTrack[]>();

  iconCheck = check;

  getFilteredTasksTracks(): TaskTrack[] {
    return this.taskTracks?.filter(
      (curTaskTrack) =>
        curTaskTrack.userId === localStorage.getItem('AuthUserId') &&
        transformDate(curTaskTrack.date.seconds * 1000).getTime() ===
          transformDate(this.currentDate).getTime()
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

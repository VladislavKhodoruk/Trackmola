import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';
import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import {
  GroupBy,
  Project,
  TaskTrack,
  Task,
  User,
} from '@shared/interfaces/interfaces';
import { IconifyIcon } from '@iconify/types';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksComponent {
  @Input() readonly project: Project;
  @Input() readonly activeTaskGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksGroupByTask: GroupBy<TaskTrack[]>;
  @Input() readonly usersInfoByUserId: GroupBy<User>;

  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconClipboard: IconifyIcon = clipboardPlus;

  protected groupByDate(taskTracks: TaskTrack[]): [string, TaskTrack[]][] {
    const taskTracksGroupByDate: GroupBy<TaskTrack[]> = taskTracks.reduce(
      (accum: GroupBy<TaskTrack[]>, taskTrack: TaskTrack) => {
        const date = taskTrack.date.seconds * 1000;
        if (!accum[date]) {
          accum[date] = [];
        }
        accum[date].push(taskTrack);
        return accum;
      },
      {}
    );

    return Object.entries(taskTracksGroupByDate).sort((a, b) => +b[0] - +a[0]);
  }

  protected addToReport(): void {}
}

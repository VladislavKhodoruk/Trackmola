import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';
import {
  TaskTrackskGroupByDate,
  TaskTrackWithUserInfo,
} from '@pages/projects/interfaces/interface';
import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { Project, Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTaskComponent implements OnChanges {
  @Input() readonly project: Project;
  @Input() readonly task: Task;
  @Input() readonly activeTaskTracksInTask: TaskTrackWithUserInfo[];

  activeTaskTracksInTaskGroupByDate: [string, TaskTrackWithUserInfo[]][];

  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconClipboard = clipboardPlus;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeTaskTracksInTask && this.activeTaskTracksInTask) {
      this.activeTaskTracksInTaskGroupByDate = this.groupByDate(
        this.activeTaskTracksInTask
      );
    }
  }

  private groupByDate(
    activeTaskTracksInTask: TaskTrackWithUserInfo[]
  ): [string, TaskTrackWithUserInfo[]][] {
    const groupByDateObject: TaskTrackskGroupByDate =
      activeTaskTracksInTask.reduce(
        (
          accumulator: TaskTrackskGroupByDate,
          currentValue: TaskTrackWithUserInfo
        ) => {
          const date = currentValue.date.seconds * 1000;
          if (!accumulator[date]) {
            accumulator[date] = [];
          }
          accumulator[date].push(currentValue);
          return accumulator;
        },
        {}
      );

    return Object.entries(groupByDateObject).sort((a, b) => +b[0] - +a[0]);
  }

  protected addToReport(): void {}
}

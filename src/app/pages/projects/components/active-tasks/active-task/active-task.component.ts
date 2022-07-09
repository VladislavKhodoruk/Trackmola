/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';
import { TaskTrackWithUserInfo } from '@pages/projects/interfaces/interface';
import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { Project, Task } from '@shared/interfaces/interfaces';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss'],
})
export class ActiveTaskComponent implements OnChanges {
  @Input() readonly project: Project;
  @Input() readonly task: Task;
  @Input() readonly activeTaskTracksInTask: TaskTrackWithUserInfo[];

  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconClipboard = clipboardPlus;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeTaskTracksInTask && this.activeTaskTracksInTask) {
      console.log(this.groupByDate(this.activeTaskTracksInTask));
    }
  }

  private groupByDate(activeTaskTracksInTask: TaskTrackWithUserInfo[]) {
    return activeTaskTracksInTask.reduce((acc, elem) => {
      const date = elem.date.seconds * 1000;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(elem);
      return acc;
    }, {});
  }

  protected addToReport(): void {}
}

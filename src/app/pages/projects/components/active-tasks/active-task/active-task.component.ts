import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';
import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { Project, Task, TaskTrack } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss'],
})
export class ActiveTaskComponent {
  @Input() readonly project: Project;
  @Input() readonly activeTask: Task;
  @Input() readonly activeTaskTracksInTask: TaskTrack[];

  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconClipboard = clipboardPlus;

  protected addToReport(): void {}
}

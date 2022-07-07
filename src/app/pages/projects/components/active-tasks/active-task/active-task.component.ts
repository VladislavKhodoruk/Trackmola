import { Component } from '@angular/core';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';
import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

@Component({
  selector: 'app-active-task',
  templateUrl: './active-task.component.html',
  styleUrls: ['./active-task.component.scss'],
})
export class ActiveTaskComponent {
  panelOpenState = false;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
  readonly iconClipboard = clipboardPlus;

  protected addToReport(): void {}
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';

import { IconifyIcon } from '@iconify/types';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';

import { ActiveTasks } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-task-item',
  templateUrl: 'active-task-item.component.html',
  styleUrls: ['active-task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTaskItemComponent {
  @Input() currentTask!: ActiveTasks;
  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  readonly clipButton: IconifyIcon = clipboardPlus;
}

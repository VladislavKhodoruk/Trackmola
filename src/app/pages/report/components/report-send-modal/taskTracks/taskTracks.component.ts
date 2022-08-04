import { Component, EventEmitter, Input, Output } from '@angular/core';
import fireIcon from '@iconify/icons-emojione/fire';
import { IconifyIcon } from '@iconify/types';

import { UntilDestroy } from '@ngneat/until-destroy';

import { TaskItem } from '@shared/interfaces/interfaces';

@UntilDestroy()
@Component({
  selector: 'app-taskTracks',
  styleUrls: ['./taskTracks.component.scss'],
  templateUrl: './taskTracks.component.html',
})
export class TaskTracksComponent {
  @Input() taskItem!: TaskItem | null;
  readonly iconFire: IconifyIcon = fireIcon;
}

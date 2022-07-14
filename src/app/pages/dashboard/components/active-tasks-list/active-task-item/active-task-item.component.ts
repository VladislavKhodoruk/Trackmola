import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';

import { ActiveTasks } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-task-item',
  templateUrl: 'active-task-item.component.html',
  styleUrls: ['active-task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTaskItemComponent {
  @Input() currentTask!: ActiveTasks;

  readonly clipButton = clipboardPlus;
}

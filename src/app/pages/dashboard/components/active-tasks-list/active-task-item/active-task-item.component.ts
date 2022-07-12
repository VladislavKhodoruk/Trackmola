import { Component, Input } from '@angular/core';
import { ActiveTasks } from '@shared/interfaces/interfaces';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';

@Component({
  selector: 'app-active-task-item',
  templateUrl: 'active-task-item.component.html',
  styleUrls: ['active-task-item.component.scss'],
})
export class ActiveTaskItemComponent {
  @Input() currentTask!: ActiveTasks;

  readonly clipButton = clipboardPlus;
}

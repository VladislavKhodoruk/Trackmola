import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActiveTasks } from '@shared/interfaces/interfaces';
import clipboardPlus from '@iconify/icons-tabler/clipboard-plus';

@Component({
  selector: 'app-active-task-item',
  templateUrl: 'active-task-item.component.html',
  styleUrls: ['active-task-item.component.scss'],
})
export class ActiveTaskItemComponent implements OnChanges {
  @Input() currentTask!: ActiveTasks;
  task: ActiveTasks;
  readonly clipButton = clipboardPlus;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTask) {
      this.task = this.currentTask;
    }
  }
}

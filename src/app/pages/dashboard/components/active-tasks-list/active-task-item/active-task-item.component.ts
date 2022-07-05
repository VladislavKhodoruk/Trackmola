import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActiveTasks } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-task-item',
  templateUrl: 'active-task-item.component.html',
  styleUrls: ['active-task-item.component.scss'],
})
export class ActiveTaskItemComponent implements OnChanges {
  @Input() currentTask!: ActiveTasks;
  @Input() index!: number;
  task: ActiveTasks;
  color = '#0d33eb';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTask) {
      this.task = this.currentTask;
    }
  }
}

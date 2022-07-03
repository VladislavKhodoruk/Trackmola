import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskTrack } from '@store/shared/shared.state';

@Component({
  selector: 'app-active-task-item',
  templateUrl: 'active-task-item.component.html',
  styleUrls: ['active-task-item.component.scss'],
})
export class ActiveTaskItemComponent implements OnChanges {
  @Input() currentTask!: TaskTrack;
  task: TaskTrack;
  color = '#0d33eb';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTask) {
      this.task = this.currentTask;
    }
  }
}

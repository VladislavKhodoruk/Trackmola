import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';
import { getRandomColor } from '@shared/helpers/helpers';

import { Project } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard-list-tasks',
  styleUrls: ['./manager-dashboard-list-tasks.component.scss'],
  templateUrl: './manager-dashboard-list-tasks.component.html',
})
export class ManagerDashboardListTasksComponent implements OnChanges {
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;

  @Output() selectTask = new EventEmitter<TaskForManager>();

  tasksColors: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasksForManager && this.tasksForManager.length) {
      this.tasksColors.length = 0;
      this.tasksForManager.forEach(() =>
        this.tasksColors.push(getRandomColor())
      );
    }
  }
}

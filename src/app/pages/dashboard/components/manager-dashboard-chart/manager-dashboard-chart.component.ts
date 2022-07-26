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
import { getRandomColor2 } from '@shared/helpers/helpers';

import { Project } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard-chart',
  styleUrls: ['./manager-dashboard-chart.component.scss'],
  templateUrl: './manager-dashboard-chart.component.html',
})
export class ManagerDashboardChartComponent implements OnChanges {
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;

  @Output() selectTask = new EventEmitter<TaskForManager>();

  tasksColors: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasksForManager && this.tasksForManager.length) {
      this.tasksColors.length = 0;
      this.tasksForManager.forEach(() =>
        this.tasksColors.push(getRandomColor2())
      );
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';

import { getRandomColor } from '@shared/helpers/helpers';
import { Period, GroupBy, Project, User } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chart-projects',
  styleUrls: ['./chart-projects.component.scss'],
  templateUrl: './chart-projects.component.html',
})
export class ChartProjectsComponent implements OnChanges {
  @Input() readonly project: Project;
  @Input() readonly tasks: TaskForManager[];
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly users: GroupBy<User>;
  @Input() readonly period: Period;

  chartXRangeMarginRight = 24;
  minChartXRangeWidth = 900;
  chartXRangeHeight = 65;

  activeTask: TaskForManager;
  managerDashboardView = ManagerDashboardView;
  colors: GroupBy<string>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks && this.tasks.length) {
      this.colors = this.tasks.reduce(
        (accum, task) => ({
          ...accum,
          [task.id]: getRandomColor(),
        }),
        {}
      );
    }

    if (
      changes.modeView &&
      this.modeView === this.managerDashboardView.Arrows
    ) {
      this.activeTask = null;
    }
  }

  protected onSelectTask(task: TaskForManager): void {
    if (this.activeTask && this.activeTask.id === task.id) {
      this.activeTask = null;
      return;
    }
    this.activeTask = task;
  }
}

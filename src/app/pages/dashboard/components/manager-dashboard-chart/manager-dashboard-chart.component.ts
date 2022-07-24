import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';

import { Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-manager-dashboard-chart',
  styleUrls: ['./manager-dashboard-chart.component.scss'],
  templateUrl: './manager-dashboard-chart.component.html',
})
export class ManagerDashboardChartComponent {
  @Input() readonly managerProjectsFilter: Project[];
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;

  @Output() selectTask = new EventEmitter<TaskForManager>();
}

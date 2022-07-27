import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';

import { Project, Vacations } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-manager-dashboard',
  styleUrls: ['./manager-dashboard.component.scss'],
  templateUrl: './manager-dashboard.component.html',
})
export class ManagerDashboardComponent {
  @Input() readonly vacations: Vacations[];
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly activeTask: TaskForManager;

  @Output() selectTask = new EventEmitter<TaskForManager>();
}

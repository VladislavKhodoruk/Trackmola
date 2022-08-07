import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';

import {
  GroupBy,
  Period,
  Project,
  User,
  Vacations,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard',
  styleUrls: ['./manager-dashboard.component.scss'],
  templateUrl: './manager-dashboard.component.html',
})
export class ManagerDashboardComponent {
  @Input() readonly vacations: Vacations[];
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly usersInfoByUserId: GroupBy<User>;
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly period: Period;
}

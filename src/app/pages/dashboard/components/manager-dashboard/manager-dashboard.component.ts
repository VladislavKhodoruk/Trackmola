import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';

import { TaskForManager } from '@pages/dashboard/interfaces/interface';

import { formationVacations } from '@shared/helpers/helpers';
import {
  GroupBy,
  Period,
  Project,
  User,
  Vacation,
  Vacations,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-dashboard',
  styleUrls: ['./manager-dashboard.component.scss'],
  templateUrl: './manager-dashboard.component.html',
})
export class ManagerDashboardComponent {
  @Input() readonly vacations: Vacation[];
  @Input() readonly activeProjectFilter: Project;
  @Input() readonly tasksForManager: TaskForManager[];
  @Input() readonly usersInfoByUserId: GroupBy<User>;
  @Input() readonly modeView: ManagerDashboardView;
  @Input() readonly period: Period;
  @Input() readonly users: User[];

  protected sortVacations(): Vacations[] {
    if (this.vacations && this.users) {
      return formationVacations(this.vacations, this.users);
    } else return [];
  }
}

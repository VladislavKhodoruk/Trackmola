import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { getCurrentHolidays } from '@shared/helpers/helpers';
import {
  GroupBy,
  Project,
  User,
  Vacation,
  Vacations,
} from '@shared/interfaces/interfaces';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-team-component',
  styleUrls: ['./manager-team.component.scss'],
  templateUrl: './manager-team.component.html',
})
export class ManagerTeamComponent implements OnChanges {
  @Input() pickedUser: User;
  @Input() projectsByUsers: GroupBy<Project[]>;
  @Input() usersByProject: GroupBy<User[]>;
  @Input() trackedTimeByProjects: GroupBy<number>;
  @Input() vacations: Vacation[];
  @Input() users: User[];

  vacationsAndHoliday: Vacations[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pickedUser) {
      if (this.pickedUser) {
        this.vacationsAndHoliday = getCurrentHolidays(
          this.pickedUser?.location,
          this.vacations,
          this.users
        );
      }
    }
  }
}

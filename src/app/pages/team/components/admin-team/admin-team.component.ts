import {
  Component,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
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
  selector: 'app-admin-team-component',
  styleUrls: ['./admin-team.component.scss'],
  templateUrl: './admin-team.component.html',
})
export class AdminTeamComponent {
  @Input() pickedUser: User;
  @Input() projectsByUsers: GroupBy<Project[]>;
  @Input() usersByProject: GroupBy<User[]>;
  @Input() trackedTimeByProjects: GroupBy<number>;
  @Input() vacations: Vacation[];
  @Input() users: User[];

  // vacationsAndHoliday: Vacations[];
  //
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.pickedUser) {
  //     if (this.pickedUser && this.vacations.length && this.users.length) {
  //       this.vacationsAndHoliday = getCurrentHolidays(
  //         this.pickedUser.location,
  //         this.vacations,
  //         this.users
  //       );
  //     }
  //   }
  // }

  protected get vacationsAndHoliday(): Vacations[] {
    if (
      this.pickedUser &&
      this.vacations &&
      this.vacations.length &&
      this.users.length
    ) {
      return getCurrentHolidays(
        this.pickedUser.location,
        this.vacations,
        this.users
      );
    }
    return [];
  }
}

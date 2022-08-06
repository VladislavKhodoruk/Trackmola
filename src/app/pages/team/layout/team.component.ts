import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { UserType } from '@shared/enums/enum';
import {
  GroupBy,
  Project,
  User,
  Vacation,
  Vacations,
} from '@shared/interfaces/interfaces';
import { getCurrentHolidays } from '@shared/helpers/helpers';

@Component({
  selector: 'app-team-component',
  styleUrls: ['./team.component.scss'],
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnChanges {
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

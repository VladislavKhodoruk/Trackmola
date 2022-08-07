import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import checksIcon from '@iconify/icons-tabler/checks';
import messagePlus from '@iconify/icons-tabler/message-plus';
import angleRight from '@iconify/icons-uil/angle-right';

import { ProjectMode } from '../enums/enums';

import { UserType } from '@shared/enums/enum';
import { getVacationsAndHolidaysByProject } from '@shared/helpers/helpers';
import {
  GroupBy,
  Project,
  User,
  Vacation,
  Vacations,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects',
  styleUrls: ['./projects.component.scss'],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnChanges {
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;
  @Input() readonly users: User[];
  @Input() readonly vacations: Vacation[];

  vacationsAndHolidaysTeam: Vacations[];

  readonly projectMode = ProjectMode;
  currentMode: string = ProjectMode.Tasks;

  readonly iconAngleRight = angleRight;
  readonly checksIcon = checksIcon;
  readonly messagePlusIcon = messagePlus;

  readonly toggleLabels = [ProjectMode.Tasks, ProjectMode.Users];

  readonly userType = UserType;
  readonly currentUser: string = localStorage.getItem('AuthUserType');

  ngOnChanges(changes: SimpleChanges) {
    if (changes.projectByRoute) {
      this.vacationsAndHolidaysTeam = getVacationsAndHolidaysByProject(
        this.usersGroupByProject[this.projectByRoute.id],
        this.vacations,
        this.users
      );
    }
  }

  changeMode(mode: string): void {
    this.currentMode = mode;
  }
}

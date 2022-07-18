import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import checksIcon from '@iconify/icons-tabler/checks';
import messagePlus from '@iconify/icons-tabler/message-plus';
import angleRight from '@iconify/icons-uil/angle-right';

import { ProjectMode } from '../enums/enums';

import { UserType } from '@shared/enums/enum';
import { GroupBy, Project, User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;

  currentMode: string = ProjectMode.Tasks;

  readonly iconAngleRight = angleRight;
  readonly checksIcon = checksIcon;
  readonly messagePlusIcon = messagePlus;

  readonly toggleLabels = [ProjectMode.Tasks, ProjectMode.Users];

  readonly userType = UserType;
  readonly currentUser: string = localStorage.getItem('AuthUserType');

  changeMode(mode: string): void {
    this.currentMode = mode;
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { UserType } from '@shared/enums/enum';
import { GroupBy, Project, User } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects-team',
  styleUrls: ['./projects-team.component.scss'],
  templateUrl: './projects-team.component.html',
})
export class ProjectsTeamComponent {
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;

  readonly roles = UserType;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
}

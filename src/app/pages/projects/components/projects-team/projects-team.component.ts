import { Component, Input } from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { GroupBy, Project, User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects-team',
  templateUrl: './projects-team.component.html',
  styleUrls: ['./projects-team.component.scss'],
})
export class ProjectsTeamComponent {
  @Input() readonly projectByRoute: Project;
  @Input() readonly usersGroupByProject: GroupBy<User[]>;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;
}

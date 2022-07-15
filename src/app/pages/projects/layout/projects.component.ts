import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import angleRight from '@iconify/icons-uil/angle-right';

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

  readonly iconAngleRight = angleRight;
}

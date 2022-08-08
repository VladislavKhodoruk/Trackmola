import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { GroupBy, Project, User } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-users-projects-component',
  styleUrls: ['./users-projects.component.scss'],
  templateUrl: './users-projects.component.html',
})
export class UsersProjectsComponent {
  @Input() pickedUser: User;
  @Input() projectsByUsers: GroupBy<Project[]>;
  @Input() usersByProject: GroupBy<User[]>;
  @Input() trackedTimeByProjects: GroupBy<number>;
}

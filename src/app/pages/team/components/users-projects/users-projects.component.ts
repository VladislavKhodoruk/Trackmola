import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import {
  GroupBy,
  Project,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

@Component({
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

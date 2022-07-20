import { Component, Input } from '@angular/core';

import {
  GroupBy,
  Project,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-tasks-users',
  templateUrl: './active-tasks-users.component.html',
  styleUrls: ['./active-tasks-users.component.scss'],
})
export class ActiveTasksUsersComponent {
  @Input() readonly project: Project;
  @Input() readonly activeTaskGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeUserGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksGroupByTask: GroupBy<TaskTrack[]>;
  @Input() readonly usersInfoByUserId: GroupBy<User>;
}

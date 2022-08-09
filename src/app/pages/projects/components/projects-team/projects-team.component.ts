import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { TaskTackStatus, UserType } from '@shared/enums/enum';
import {
  GroupBy,
  Project,
  TaskTrack,
  User,
} from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects-team',
  styleUrls: ['./projects-team.component.scss'],
  templateUrl: './projects-team.component.html',
})
export class ProjectsTeamComponent {
  @Input() readonly projectByRoute: Project;
  @Input() readonly taskTracks: TaskTrack[];

  @Input() readonly usersGroupByProject: GroupBy<User[]>;

  readonly roles = UserType;

  readonly defaultPhoto: string = DEFAULT_PHOTO_URL;

  protected getUserStatus(user: User): TaskTackStatus {
    const taskTracksByUser = this.taskTracks.filter(
      (taskTrack) => taskTrack.userId === user.id
    );

    const checkStatus = taskTracksByUser.some(
      (taskTrack) => taskTrack.taskTrackStatus !== TaskTackStatus.Approved
    );

    return checkStatus ? TaskTackStatus.Sended : TaskTackStatus.Approved;
  }
}

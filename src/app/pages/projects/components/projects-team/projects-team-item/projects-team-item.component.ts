import { Component, Input } from '@angular/core';
import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects-team-item',
  templateUrl: './projects-team-item.component.html',
  styleUrls: ['./projects-team-item.component.scss'],
})
export class ProjectsTeamItemComponent {
  @Input() readonly activeTasksInProject: TaskTrack[];
  @Input() readonly usersInProject: User[];
  @Input() readonly projectByRoute: Project;
}

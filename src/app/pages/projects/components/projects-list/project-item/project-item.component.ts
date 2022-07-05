import { Component, Input } from '@angular/core';
import { TaskStatus } from '@shared/enums/enum';
import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-project-item ',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent {
  @Input() readonly project: Project;
  @Input() readonly users: User[];
  @Input() readonly allTaskTracks: TaskTrack[];

  protected get activeTasksInProject(): TaskTrack[] {
    if (this.project && this.allTaskTracks.length) {
      return this.allTaskTracks.filter(({ projectId, status }) => {
        const compareProject = projectId === this.project.id;
        const compareStatus = status === TaskStatus.InProgress;
        return compareProject && compareStatus;
      });
    }
    return [];
  }

  protected get usersInProject(): User[] | [] {
    if (this.project && this.users.length) {
      const usersInProjects = this.allTaskTracks
        .filter(({ projectId }) => projectId === this.project.id)
        .map((task) => task.userId);

      return this.users.filter(({ id }) => usersInProjects.includes(id));
    }
    return [];
  }
}

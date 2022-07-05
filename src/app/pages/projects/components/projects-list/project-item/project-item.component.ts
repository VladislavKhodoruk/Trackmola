import { Component, Input } from '@angular/core';
import { Project, TaskTrack, User, Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-project-item ',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent {
  @Input() readonly project: Project;
  @Input() readonly tasks: Task[];
  @Input() readonly users: User[];
  @Input() readonly taskTracks: TaskTrack[];

  protected get activeTasksInProject(): Task[] {
    if (this.project && this.tasks.length) {
      return this.tasks.filter(({ projectId, archived }) => {
        const compareProject = projectId === this.project.id;
        return compareProject && !archived;
      });
    }
    return [];
  }

  protected get usersInProject(): User[] | [] {
    if (this.project && this.users.length) {
      const usersIdInProjects: TaskTrack['userId'][] = this.taskTracks
        .filter(({ projectId }, index) => {
          if (index < 5) {
            return projectId === this.project.id;
          }
        })
        .sort((a, b) => b.date.seconds - a.date.seconds)
        .map((taskTrack) => taskTrack.userId);

      return usersIdInProjects.map((userId) =>
        this.users.find((user) => user.id === userId)
      );
    }
    return [];
  }
}

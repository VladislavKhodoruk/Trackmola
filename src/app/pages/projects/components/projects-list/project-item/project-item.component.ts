import { Component, Input } from '@angular/core';
import {
  Project,
  TaskTrack,
  User,
  Task,
  Period,
} from '@shared/interfaces/interfaces';

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
  @Input() readonly period: Period;

  protected get activeTasksInProject(): TaskTrack[] {
    if (this.project && this.tasks.length && this.taskTracks.length) {
      const tasksIdInProject: Task['id'][] = this.tasks
        .filter(({ projectId }) => projectId === this.project.id)
        .map((task) => task.id);
      return this.taskTracks
        .filter(({ taskId }) => tasksIdInProject.includes(taskId))
        .filter(({ date }) => {
          const startDate = this.period.start;
          const endDate = this.period.end;
          return (
            date.seconds * 1000 >= startDate && date.seconds * 1000 <= endDate
          );
        });
    }
    return [];
  }

  protected get usersInProject(): User[] | [] {
    if (this.project && this.users.length) {
      const usersIdInProjects: TaskTrack['userId'][] = this.taskTracks
        .filter(({ projectId }) => projectId === this.project.id)
        .sort((a, b) => b.date.seconds - a.date.seconds)
        .map((taskTrack) => taskTrack.userId);

      return usersIdInProjects.map((userId) =>
        this.users.find((user) => user.id === userId)
      );
    }
    return [];
  }
}

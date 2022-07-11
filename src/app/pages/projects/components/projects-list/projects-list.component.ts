import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project, User, Task } from '@shared/interfaces/interfaces';
import { RouterStateUrl } from '@store/router/custom-serializer';
import {
  TaskGroupByProject,
  UsersGroupByProject,
} from '@pages/projects/interfaces/interface';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  @Input() readonly searchText: string;
  @Input() readonly projects: Project[];
  @Input() readonly currentRoute: RouterStateUrl;
  @Input() readonly usersGroupByProject: UsersGroupByProject;
  @Input() readonly activeTaskGroupByProject: TaskGroupByProject;

  protected usersInProject(project: Project): User[] {
    if (
      this.usersGroupByProject[project.id] &&
      this.usersGroupByProject[project.id].every((user) => !!user)
    ) {
      return this.usersGroupByProject[project.id];
    }
    return [];
  }

  protected activeTaskInProject(project: Project): Task[] {
    if (
      this.activeTaskGroupByProject[project.id] &&
      this.activeTaskGroupByProject[project.id].every((task) => !!task)
    ) {
      return this.activeTaskGroupByProject[project.id];
    }
    return [];
  }
}

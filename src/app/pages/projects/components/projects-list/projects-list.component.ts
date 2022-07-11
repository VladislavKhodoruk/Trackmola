import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project, User } from '@shared/interfaces/interfaces';
import { RouterStateUrl } from '@store/router/custom-serializer';
import { UsersGroupByProject } from '@pages/projects/interfaces/interface';

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

  protected usersInProject(project: Project): User[] {
    if (
      this.usersGroupByProject[project.id] &&
      this.usersGroupByProject[project.id].every((user) => !!user)
    ) {
      return this.usersGroupByProject[project.id];
    }
    return [];
  }
}

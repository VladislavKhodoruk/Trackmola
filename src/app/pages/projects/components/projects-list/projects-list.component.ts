import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project, User, Task } from '@shared/interfaces/interfaces';
import { RouterStateUrl } from '@store/router/custom-serializer';
import {
  TaskGroupByProject,
  UsersGroupByProject,
} from '@pages/projects/interfaces/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  @Input() readonly searchText: string;
  @Input() readonly projects: Project[];
  @Input() readonly usersGroupByProject: UsersGroupByProject;
  @Input() readonly activeTaskGroupByProject: TaskGroupByProject;

  constructor(public router: Router) {}
}

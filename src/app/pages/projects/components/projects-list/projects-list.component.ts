import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import searchIcon from '@iconify/icons-tabler/search';
import { IconifyIcon } from '@iconify/types';

import { GroupBy, Project, User, Task } from '@shared/interfaces/interfaces';
import { RouterStateUrl } from '@store/router/custom-serializer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects-list',
  styleUrls: ['./projects-list.component.scss'],
  templateUrl: './projects-list.component.html',
})
export class ProjectsListComponent implements OnChanges {
  @Input() readonly projects: Project[];
  @Input() readonly usersGroupByProject: GroupBy<User[]>;
  @Input() readonly activeTaskGroupByProject: GroupBy<Task[]>;
  @Input() readonly currentRoute: RouterStateUrl;

  @Input() searchText: string;

  @Output() search = new EventEmitter<string>();

  readonly iconSearch: IconifyIcon = searchIcon;

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.projects && !this.currentRoute.params.name) {
      const firstProject = this.projects
        .map((project) => ({
          ...project,
          activeTasksLength: this.activeTaskGroupByProject[project.id].length,
        }))
        .sort((a, b) => b.activeTasksLength - a.activeTasksLength)[0];
      this.router.navigate([firstProject.name.toLowerCase()], {
        relativeTo: this.route,
      });
    }
  }
}

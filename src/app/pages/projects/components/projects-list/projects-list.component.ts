import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Project } from '@shared/interfaces/interfaces';
import {
  TaskGroupByProject,
  UsersGroupByProject,
} from '@pages/projects/interfaces/interface';
import { Router } from '@angular/router';
import searchIcon from '@iconify/icons-tabler/search';
import { IconifyIcon } from '@iconify/types';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  @Input() readonly projects: Project[];
  @Input() readonly usersGroupByProject: UsersGroupByProject;
  @Input() readonly activeTaskGroupByProject: TaskGroupByProject;
  @Input() searchText: string;

  @Output() search = new EventEmitter<string>();

  readonly iconSearch: IconifyIcon = searchIcon;

  constructor(public router: Router) {}
}

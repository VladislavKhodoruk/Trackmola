import { Project } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  activeTaskGroupByProject,
  getSearchValue,
  usersGroupByProject,
} from '@pages/projects/store/projects.selectors';
import { TrackMolaState } from '@store/trackMola.state';
import { getProjects } from '@store/common/common.selectors';
import { getCurrentRoute } from '@store/router/router.selector';
import { RouterStateUrl } from '@store/router/custom-serializer';
import {
  TaskGroupByProject,
  UsersGroupByProject,
} from '@pages/projects/interfaces/interface';

@Component({
  selector: 'app-projects-list-container',
  template: `<app-projects-list
    [searchText]="searchText$ | async"
    [projects]="projects$ | async"
    [currentRoute]="currentRoute$ | async"
    [usersGroupByProject]="usersGroupByProject$ | async"
    [activeTaskGroupByProject]="activeTaskGroupByProject$ | async"
  ></app-projects-list>`,
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListContainer {
  readonly projects$: Observable<Project[]> = this.store$.select(getProjects);
  readonly activeTaskGroupByProject$: Observable<TaskGroupByProject> =
    this.store$.select(activeTaskGroupByProject);
  readonly usersGroupByProject$: Observable<UsersGroupByProject> =
    this.store$.select(usersGroupByProject);
  readonly currentRoute$: Observable<RouterStateUrl> =
    this.store$.select(getCurrentRoute);

  readonly searchText$: Observable<string> = this.store$.select(getSearchValue);

  constructor(private store$: Store<TrackMolaState>) {}
}

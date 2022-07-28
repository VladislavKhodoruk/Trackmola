import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { setSearchValue } from '@pages/projects/store/projects.actions';
import {
  activeTaskGroupByProject,
  getSearchValue,
  usersGroupByProject,
} from '@pages/projects/store/projects.selectors';
import { GroupBy, Project, User, Task } from '@shared/interfaces/interfaces';
import { getProjects } from '@store/common/common.selectors';
import { RouterStateUrl } from '@store/router/custom-serializer';
import { getCurrentRoute } from '@store/router/router.selector';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projects-list-container',
  styleUrls: ['./projects-list.container.scss'],
  template: `<app-projects-list
    class="projects-list-container"
    [searchText]="searchText$ | async"
    [projects]="projects$ | async"
    [usersGroupByProject]="usersGroupByProject$ | async"
    [activeTaskGroupByProject]="activeTaskGroupByProject$ | async"
    [currentRoute]="currentRoute$ | async"
    (search)="onSearch($event)"
  ></app-projects-list>`,
})
export class ProjectsListContainer {
  readonly projects$: Observable<Project[]> = this.store$.select(getProjects);

  readonly activeTaskGroupByProject$: Observable<GroupBy<Task[]>> =
    this.store$.select(activeTaskGroupByProject);

  readonly usersGroupByProject$: Observable<GroupBy<User[]>> =
    this.store$.select(usersGroupByProject);

  readonly currentRoute$: Observable<RouterStateUrl> =
    this.store$.select(getCurrentRoute);

  readonly searchText$: Observable<string> = this.store$.select(getSearchValue);

  constructor(private store$: Store<TrackMolaState>) {}

  public onSearch(value: string): void {
    this.store$.dispatch(setSearchValue({ value }));
  }
}

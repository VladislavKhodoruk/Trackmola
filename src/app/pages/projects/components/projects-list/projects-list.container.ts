import { Project } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getSearchValue } from '@pages/projects/store/projects.selectors';
import { TrackMolaState } from '@store/trackMola.state';
import { getProjects } from '@store/common/common.selectors';

@Component({
  selector: 'app-projects-list-container',
  template: `<app-projects-list
    [searchText]="searchText$ | async"
    [projects]="projects$ | async"
  ></app-projects-list>`,
})
export class ProjectsListContainer {
  readonly projects$: Observable<Project[]> = this.store$.select(getProjects);
  readonly searchText$: Observable<string> = this.store$.select(getSearchValue);

  constructor(private store$: Store<TrackMolaState>) {}
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '@shared/interfaces/interfaces';
import { setSelectedProject } from '@pages/projects/store/projects.actions';
import {
  getMyProjects,
  getSearchValue,
  getSelectedProject,
} from '@pages/projects/store/projects.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-list-container',
  template: `<app-projects-list
    [myProjects]="myProjects$ | async"
    [searchText]="searchText$ | async"
    [selectedProject]="selectedProject$ | async"
    (selectProject)="onSelectProject($event)"
  ></app-projects-list>`,
})
export class ProjectsListContainer {
  readonly myProjects$ = this.store$.select(getMyProjects);
  readonly searchText$ = this.store$.select(getSearchValue);
  readonly selectedProject$ = this.store$.select(getSelectedProject);

  constructor(private store$: Store<TrackMolaState>) {}

  public onSelectProject(project: Project): void {
    this.store$.dispatch(setSelectedProject({ project }));
  }
}

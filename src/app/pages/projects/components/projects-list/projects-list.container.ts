import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '@pages/projects/interfaces/interfaces';
import { setSelectedProject } from '@pages/projects/store/projects.actions';
import {
  getMyProgects,
  getSearchValue,
  getSelectedProject,
} from '@pages/projects/store/projects.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-list-container',
  template: `<app-projects-list
    [myProjects]="this.myProjects$ | async"
    [searchText]="this.searchText$ | async"
    [selectedProject]="this.selectedProject$ | async"
    (selectProjectEmitter)="onSelectProject($event)"
  ></app-projects-list>`,
})
export class ProjectsListContainer {
  myProjects$ = this.store$.select(getMyProgects);
  selectedProject$ = this.store$.select(getSelectedProject);
  searchText$ = this.store$.select(getSearchValue);

  constructor(private store$: Store<TrackMolaState>) {}

  onSelectProject(project: Project) {
    this.store$.dispatch(setSelectedProject({ project }));
  }
}

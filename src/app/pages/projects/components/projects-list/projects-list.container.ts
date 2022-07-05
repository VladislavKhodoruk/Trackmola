import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project, User, TaskTrack } from '@shared/interfaces/interfaces';
import { setSelectedProject } from '@pages/projects/store/projects.actions';
import {
  getMyProjects,
  getSearchValue,
  getSelectedProject,
  getUsers,
  getAllTaskTracks,
} from '@pages/projects/store/projects.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-list-container',
  template: `<app-projects-list
    [myProjects]="myProjects$ | async"
    [allTaskTracks]="allTaskTracks$ | async"
    [users]="users$ | async"
    [searchText]="searchText$ | async"
    [selectedProject]="selectedProject$ | async"
    (selectProject)="onSelectProject($event)"
  ></app-projects-list>`,
})
export class ProjectsListContainer {
  readonly myProjects$: Observable<Project[]> =
    this.store$.select(getMyProjects);
  readonly allTaskTracks$: Observable<TaskTrack[]> =
    this.store$.select(getAllTaskTracks);
  readonly users$: Observable<User[]> = this.store$.select(getUsers);
  readonly searchText$: Observable<string> = this.store$.select(getSearchValue);
  readonly selectedProject$: Observable<Project> =
    this.store$.select(getSelectedProject);

  constructor(private store$: Store<TrackMolaState>) {}

  public onSelectProject(project: Project): void {
    this.store$.dispatch(setSelectedProject({ project }));
  }
}

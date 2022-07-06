import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Project,
  User,
  TaskTrack,
  Task,
  Period,
} from '@shared/interfaces/interfaces';
import {
  getProjects,
  getSearchValue,
  getSelectedProject,
  getUsers,
  getTaskTracks,
  getTasks,
  getPeriod,
} from '@pages/projects/store/projects.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-list-container',
  template: `<app-projects-list
    [projects]="projects$ | async"
    [tasks]="tasks$ | async"
    [taskTracks]="taskTracks$ | async"
    [users]="users$ | async"
    [period]="period$ | async"
    [searchText]="searchText$ | async"
  ></app-projects-list>`,
})
export class ProjectsListContainer {
  readonly projects$: Observable<Project[]> = this.store$.select(getProjects);
  readonly tasks$: Observable<Task[]> = this.store$.select(getTasks);
  readonly taskTracks$: Observable<TaskTrack[]> =
    this.store$.select(getTaskTracks);
  readonly users$: Observable<User[]> = this.store$.select(getUsers);
  readonly searchText$: Observable<string> = this.store$.select(getSearchValue);
  readonly selectedProject$: Observable<Project> =
    this.store$.select(getSelectedProject);
  readonly period$: Observable<Period> = this.store$.select(getPeriod);

  constructor(private store$: Store<TrackMolaState>) {}
}

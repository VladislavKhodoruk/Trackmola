import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';
import { getAllProjects, getAllTasks } from '@store/shared/shared.actions';
import { getProjects, inProgressTasks } from '@store/shared/shared.selectors';

@Component({
  selector: 'active-tasks-list-container',
  template: `<app-active-tasks-list
    [allTasks]="tasks$ | async"
    [allProjects]="projects$ | async"
  ></app-active-tasks-list>`,
})
export class ActiveTasksListContainer {
  tasks$ = this.store$.select(inProgressTasks);
  projects$ = this.store$.select(getProjects);
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getAllTasks());
    this.store$.dispatch(getAllProjects());
  }
}

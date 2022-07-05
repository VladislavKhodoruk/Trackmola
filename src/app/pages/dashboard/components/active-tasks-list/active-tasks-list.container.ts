import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';

import { inProgressTasks } from '@store/shared/shared.selectors';
import {
  getActiveTasks,
  getAllProjects,
  getAllTasks,
  getAllUsers,
} from '@pages/dashboard/store/dashboard.actions';

@Component({
  selector: 'active-tasks-list-container',
  template: `<app-active-tasks-list
    [allTasks]="tasks$ | async"
  ></app-active-tasks-list>`,
})
export class ActiveTasksListContainer {
  tasks$ = this.store$.select(inProgressTasks);
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getAllProjects());
    this.store$.dispatch(getAllTasks());
    this.store$.dispatch(getAllUsers());
    this.store$.dispatch(getActiveTasks());
  }
}

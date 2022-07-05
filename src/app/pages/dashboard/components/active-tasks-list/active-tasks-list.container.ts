import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';
import {
  getActiveTasks,
  getAllProjects,
  getAllTasks,
  getAllTaskTracks,
  getAllUsers,
} from '@pages/dashboard/store/dashboard.actions';
import { getTaskWithAllParametrs } from '@pages/dashboard/store/dashboard.selectors';

@Component({
  selector: 'active-tasks-list-container',
  template: `<app-active-tasks-list
    [fullTask]="fullTask$ | async"
  ></app-active-tasks-list>`,
})
export class ActiveTasksListContainer {
  fullTask$ = this.store$.select(getTaskWithAllParametrs);
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getAllProjects());
    this.store$.dispatch(getAllTasks());
    this.store$.dispatch(getAllUsers());
    this.store$.dispatch(getActiveTasks());
    this.store$.dispatch(getAllTaskTracks());
  }
}

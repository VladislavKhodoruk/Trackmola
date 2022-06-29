import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';
import { getAllTasks, getAllTasksSuccess } from '@store/shared/shared.actions';
import { allTasks } from '@store/shared/shared.selectors';

@Component({
  selector: 'active-tasks-list-container',
  template: `<app-active-tasks-list
    [allTasks]="tasks$ | async"
  ></app-active-tasks-list>`,
})
export class ActiveTasksListContainer {
  tasks$ = this.store$.select(allTasks);
  constructor(private store$: Store<TrackMolaState>){
    this.store$.dispatch(getAllTasks());
  }
}

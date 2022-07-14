import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getTaskWithAllParametrs } from '@pages/dashboard/store/dashboard.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'active-tasks-list-container',
  template: `<app-active-tasks-list
    [fullTask]="fullTask$ | async"
  ></app-active-tasks-list>`,
})
export class ActiveTasksListContainer {
  fullTask$ = this.store$.select(getTaskWithAllParametrs);
  constructor(private store$: Store<TrackMolaState>) {}
}

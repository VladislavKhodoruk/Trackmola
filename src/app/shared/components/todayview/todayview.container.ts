import { TaskTrack } from '@shared/interfaces/interfaces';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from 'app/store/trackMola.state';
import {
  getDate,
  getProjects,
  getTasks,
  getTasksTrack,
} from '@store/common/common.selectors';
import { putTaskTrack } from '@pages/report/store/report.actions';

@Component({
  selector: 'app-todayview-container',
  template: `<app-todayview-component
    [taskTracks]="taskTracks$ | async"
    [tasks]="tasks$ | async"
    [projects]="projects$ | async"
    [currentDate]="currentDate$ | async"
    (taskTrack)="putIntoStore($event)"
  ></app-todayview-component>`,
})
export class TodayviewContainer {
  taskTracks$ = this.store$.select(getTasksTrack);
  tasks$ = this.store$.select(getTasks);
  projects$ = this.store$.select(getProjects);
  currentDate$ = this.store$.select(getDate);
  putIntoStore(taskTrack: TaskTrack) {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }
  constructor(private store$: Store<TrackMolaState>) {}
}

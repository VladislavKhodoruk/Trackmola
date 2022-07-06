import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from 'app/store/trackMola.state';
import {
  getAllProjectsData,
  getAllTasksData,
} from '@pages/report/store/report.selectors';
import { allTasksTrack, getDate } from '@store/common/common.selectors';

@Component({
  selector: 'app-todayview-container',
  template: `<app-todayview-component
    [taskTracks]="taskTracks$ | async"
    [tasks]="tasks$ | async"
    [projects]="projects$ | async"
    [currentDate]="currentDate$ | async"
  ></app-todayview-component>`,
})
export class TodayviewContainer {
  taskTracks$ = this.store$.select(allTasksTrack);
  tasks$ = this.store$.select(getAllTasksData);
  projects$ = this.store$.select(getAllProjectsData);
  currentDate$ = this.store$.select(getDate);
  constructor(private store$: Store<TrackMolaState>) {}
}

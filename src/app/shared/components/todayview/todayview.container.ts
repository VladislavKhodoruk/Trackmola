import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { putTaskTrack } from '@pages/report/store/report.actions';
import { TaskTrack } from '@shared/interfaces/interfaces';
import { addTaskTrack, deleteTaskTrack } from '@store/common/common.actions';
import {
  getDate,
  getProjects,
  getTasks,
  getTasksTrack,
} from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from 'app/store/trackMola.state';

@Component({
  selector: 'app-todayview-container',
  template: `<app-todayview-component
    [taskTracks]="taskTracks$ | async"
    [tasks]="tasks$ | async"
    [projects]="projects$ | async"
    [currentDate]="currentDate$ | async"
    (taskTrack)="putIntoStore($event)"
    (deleteTaskTrack)="deleteTaskTrack($event)"
    (addCurTaskTrack)="addCurTaskTrack($event)"
  ></app-todayview-component>`,
})
export class TodayviewContainer {
  taskTracks$ = this.store$.select(getTasksTrack);
  tasks$ = this.store$.select(getTasks);
  projects$ = this.store$.select(getProjects);
  currentDate$ = this.store$.select(getDate);

  constructor(
    private store$: Store<TrackMolaState>,
    private commonStore$: Store<CommonState>
  ) {}

  putIntoStore(taskTrack: TaskTrack): void {
    this.store$.dispatch(putTaskTrack({ taskTrack }));
  }

  deleteTaskTrack(id: string): void {
    this.store$.dispatch(deleteTaskTrack({ id }));
  }

  addCurTaskTrack(tasktrack: TaskTrack): void {
    this.commonStore$.dispatch(addTaskTrack({ tasktrack }));
  }
}

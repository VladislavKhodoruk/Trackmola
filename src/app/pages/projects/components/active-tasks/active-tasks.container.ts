import { TrackMolaState } from './../../../../store/trackMola.state';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import {
  getActiveTasksInProject,
  getProjectByRoute,
} from '@pages/projects/store/projects.selectors';
import { Project, Task } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-active-tasks-container',
  template: `<app-active-tasks
    [project]="project$ | async"
    [activeTasks]="activeTasks$ | async"
  ></app-active-tasks>`,
  styleUrls: ['./active-tasks.component.scss'],
})
export class ActiveTasksContainer {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);
  readonly activeTasks$: Observable<Task[]> = this.store$.select(
    getActiveTasksInProject
  );

  constructor(private store$: Store<TrackMolaState>) {}
}

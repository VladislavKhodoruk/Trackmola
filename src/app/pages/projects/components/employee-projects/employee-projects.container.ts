import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTasks } from '@pages/projects/store/projects.actions';
import { getSelectedProject } from '@pages/projects/store/projects.selectors';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-employee-projects-container',
  template: `<app-employee-projects
    [selectedProject]="selectedProject$ | async"
  ></app-employee-projects>`,
})
export class EmployeeProjectsContainer {
  readonly selectedProject$ = this.store$.select(getSelectedProject);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getTasks());
  }
}

import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAllUsers,
  clearProjectStore,
  getProjects,
  getAllTasks,
} from '@pages/projects/store/projects.actions';
import { getSelectedProject } from '@pages/projects/store/projects.selectors';
import { getPeriod } from '@shared/helpers/helpers';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-employee-projects-container',
  template: `<app-employee-projects
    [selectedProject]="selectedProject$ | async"
  ></app-employee-projects>`,
})
export class EmployeeProjectsContainer implements OnDestroy {
  readonly selectedProject$ = this.store$.select(getSelectedProject);

  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(
      getAllTasks({ period: getPeriod(new Date(), 'week') })
    );
    this.store$.dispatch(getAllUsers());
    this.store$.dispatch(getProjects());
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearProjectStore());
  }
}

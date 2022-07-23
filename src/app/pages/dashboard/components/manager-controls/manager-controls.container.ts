import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import {
  setProjectFilter,
  removeProjectFilter,
  changeManagerMainView,
} from '@pages/dashboard/store/dashboard.actions';
import {
  getManagerProjectsFilter,
  getManadgersProjects,
  getModeView,
} from '@pages/dashboard/store/dashboard.selectors';
import { Project } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-manager-controls-container',
  template: `<app-manager-controls
    [managerProjects]="managerProjects$ | async"
    [managerProjectsFilter]="managerProjectsFilter$ | async"
    [modeView]="modeView$ | async"
    (projectFilter)="onProjectFilter($event)"
    (removeProjectFilter)="onRemoveProjectFilter($event)"
    (changeManagerMainView)="onChangeManagerMainView($event)"
  ></app-manager-controls>`,
  styleUrls: ['./manager-controls.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerControlsContainer {
  readonly managerProjects$: Observable<Project[]> =
    this.store$.select(getManadgersProjects);

  readonly managerProjectsFilter$: Observable<Project[]> = this.store$.select(
    getManagerProjectsFilter
  );

  readonly modeView$: Observable<ManagerDashboardView> =
    this.store$.select(getModeView);

  constructor(private store$: Store<TrackMolaState>) {}

  public onProjectFilter(projectName: Project['name']): void {
    this.store$.dispatch(setProjectFilter({ projectName }));
  }

  public onRemoveProjectFilter(projectName: Project['name']): void {
    this.store$.dispatch(removeProjectFilter({ projectName }));
  }

  public onChangeManagerMainView(mode: ManagerDashboardView): void {
    this.store$.dispatch(changeManagerMainView({ mode }));
  }
}

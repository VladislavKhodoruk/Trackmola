import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import {
  setProjectFilter,
  removeProjectFilter,
  changeManagerMainView,
  setActiveProjectFilter,
} from '@pages/dashboard/store/dashboard.actions';
import {
  getManagerProjectsFilter,
  getManadgersProjects,
  getActiveProjectFilter,
} from '@pages/dashboard/store/dashboard.selectors';
import { Project } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-controls-container',
  styleUrls: ['./manager-controls.container.scss'],
  template: `<app-manager-controls
    [managerProjects]="managerProjects$ | async"
    [managerProjectsFilter]="managerProjectsFilter$ | async"
    [activeProjectFilter]="activeProjectFilter$ | async"
    [modeView]="modeView"
    (projectFilter)="onProjectFilter($event)"
    (removeProjectFilter)="onRemoveProjectFilter()"
    (setActiveFilterProject)="onSetActiveFilterProject($event)"
    (changeManagerMainView)="onChangeManagerMainView($event)"
  ></app-manager-controls>`,
})
export class ManagerControlsContainer {
  @Input() readonly modeView: ManagerDashboardView;

  readonly managerProjects$: Observable<Project[]> =
    this.store$.select(getManadgersProjects);

  readonly managerProjectsFilter$: Observable<Project[]> = this.store$.select(
    getManagerProjectsFilter
  );

  readonly activeProjectFilter$: Observable<Project> = this.store$.select(
    getActiveProjectFilter
  );

  constructor(private store$: Store<TrackMolaState>) {}

  public onProjectFilter(projectName: Project['name']): void {
    this.store$.dispatch(setProjectFilter({ projectName }));
  }

  public onSetActiveFilterProject(activeProject: Project): void {
    this.store$.dispatch(setActiveProjectFilter({ activeProject }));
  }

  public onRemoveProjectFilter(): void {
    this.store$.dispatch(removeProjectFilter());
  }

  public onChangeManagerMainView(mode: ManagerDashboardView): void {
    this.store$.dispatch(changeManagerMainView({ mode }));
  }
}

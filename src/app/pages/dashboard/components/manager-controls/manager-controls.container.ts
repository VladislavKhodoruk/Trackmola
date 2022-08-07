import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ManagerDashboardView } from '@pages/dashboard/enums/enum';
import {
  setProjectFilter,
  removeActiveProject,
  changeManagerMainView,
  setActiveProjectFilter,
  removeProjectFilter,
  changeManagerPeriod,
} from '@pages/dashboard/store/dashboard.actions';
import {
  getManagerProjectsFilter,
  getActiveProjectFilter,
} from '@pages/dashboard/store/dashboard.selectors';
import { Period, Project } from '@shared/interfaces/interfaces';

import { getProjects } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-manager-controls-container',
  styleUrls: ['./manager-controls.container.scss'],
  template: `<app-manager-controls
    [projects]="projects$ | async"
    [managerProjectsFilter]="managerProjectsFilter$ | async"
    [activeProjectFilter]="activeProjectFilter$ | async"
    [modeView]="modeView"
    (projectFilter)="onProjectFilter($event)"
    (removeProjectFilter)="onRemoveProjectFilter($event)"
    (removeActiveProject)="onRemoveActiveProject()"
    (setActiveFilterProject)="onSetActiveFilterProject($event)"
    (changeManagerMainView)="onChangeManagerMainView($event)"
    (changePeriod)="onChangePeriod($event)"
  ></app-manager-controls>`,
})
export class ManagerControlsContainer {
  @Input() readonly modeView: ManagerDashboardView;

  readonly projects$: Observable<Project[]> = this.store$.select(getProjects);

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

  public onRemoveProjectFilter(project: Project): void {
    this.store$.dispatch(removeProjectFilter({ project }));
  }

  public onRemoveActiveProject(): void {
    this.store$.dispatch(removeActiveProject());
  }

  public onChangeManagerMainView(mode: ManagerDashboardView): void {
    this.store$.dispatch(changeManagerMainView({ mode }));
  }

  public onChangePeriod(period: Period): void {
    this.store$.dispatch(changeManagerPeriod({ period }));
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { getManagerProjectsFilter } from '@pages/dashboard/store/dashboard.selectors';
import { Project } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-manager-dashboard-chart-container',
  template: `<app-manager-dashboard-chart
    [managerProjectsFilter]="managerProjectsFilter$ | async"
  ></app-manager-dashboard-chart>`,
  styleUrls: ['./manager-dashboard-chart.container.scss'],
})
export class ManagerDashboardChartContainer {
  readonly managerProjectsFilter$: Observable<Project[]> = this.store$.select(
    getManagerProjectsFilter
  );

  constructor(private store$: Store<TrackMolaState>) {}
}

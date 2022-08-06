import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  changeDashboardView,
  clearDashboardState,
} from '../store/dashboard.actions';

import { getDashboardView } from '../store/dashboard.selectors';

import { UserType } from '@shared/enums/enum';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-dashboard-container',
  template: `<app-dashboard
    [dashboardView]="dashboardView$ | async"
  ></app-dashboard>`,
})
export class DashboardContainer implements OnInit, OnDestroy {
  readonly dashboardView$: Observable<UserType> =
    this.store$.select(getDashboardView);

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {
    const authTypeUser: UserType = localStorage.getItem(
      'AuthUserType'
    ) as UserType;

    this.store$.dispatch(changeDashboardView({ dashboardView: authTypeUser }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearDashboardState());
  }
}

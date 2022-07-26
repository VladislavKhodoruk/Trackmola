import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { clearDashboardState } from '../store/dashboard.actions';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-dashboard-container',
  template: '<app-dashboard [userType]="userType"></app-dashboard>',
})
export class DashboardContainer implements OnDestroy {
  readonly userType: string = localStorage.getItem('AuthUserType');

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnDestroy(): void {
    this.store$.dispatch(clearDashboardState());
  }
}

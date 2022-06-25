import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserType } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-dashboard-container',
  template: `<app-dashboard
    [userType]="this.userType$ | async"
  ></app-dashboard>`,
})
export class DashboardContainer {
  userType$ = this.store$.select(getUserType);
  constructor(private store$: Store<TrackMolaState>) {}
}

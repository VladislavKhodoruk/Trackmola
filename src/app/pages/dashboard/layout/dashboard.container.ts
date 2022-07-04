import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-dashboard-container',
  template: '<app-dashboard [userType]="this.userType"></app-dashboard>',
})
export class DashboardContainer {
  readonly userType: string = localStorage.getItem('AuthUserType');
  constructor(private store$: Store<TrackMolaState>) {}
}

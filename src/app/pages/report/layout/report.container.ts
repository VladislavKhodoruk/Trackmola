import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-report-container',
  template: '<app-report [userType]="this.userType"></app-report>',
})
export class ReportContainer {
  userType = localStorage.getItem('AuthUserType');
  constructor(private store$: Store<TrackMolaState>) {}
}

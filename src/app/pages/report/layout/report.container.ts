import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getUserType } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-report-container',
  template: '<app-report [userType]="this.userType$ | async"></app-report>',
})
export class ReportContainer {
  userType$ = this.store$.select(getUserType);
  constructor(private store$: Store<TrackMolaState>) {}
}

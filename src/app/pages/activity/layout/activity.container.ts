import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserType } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-activity-container',
  template: '<app-activity [userType]="this.userType$ | async"></app-activity>',
})
export class ActivityContainer {
  userType$ = this.store$.select(getUserType);
  constructor(private store$: Store<TrackMolaState>) {}
}

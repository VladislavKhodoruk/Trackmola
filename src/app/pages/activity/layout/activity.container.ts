import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserType } from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-activity-container',
  template: '<app-activity [userType]="this.userType$ | async"></app-activity>',
})
export class ActivityContainer {
  userType$ = this.store$.select(getUserType);
  constructor(private store$: Store<TrackMolaState>) {}
}

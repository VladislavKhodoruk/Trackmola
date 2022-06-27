import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserType } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-team-container',
  template: '<app-team [userType]="this.userType$ | async"></app-team>',
})
export class TeamContainer {
  userType$ = this.store$.select(getUserType);
  constructor(private store$: Store<TrackMolaState>) {}
}

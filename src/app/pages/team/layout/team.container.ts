import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-team-container',
  template: '<app-team [userType]="this.userType"></app-team>',
})
export class TeamContainer {
  readonly userType: string = localStorage.getItem('AuthUserType');
  constructor(private store$: Store<TrackMolaState>) {}
}

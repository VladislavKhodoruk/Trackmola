import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserType } from '@store/shared/shared.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-container',
  template: '<app-projects [userType]="this.userType$ | async"></app-projects>',
})
export class ProjectsContainer {
  userType$ = this.store$.select(getUserType);
  constructor(private store$: Store<TrackMolaState>) {}
}

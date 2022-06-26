import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';
import { clearProjectStore } from '@pages/projects/store/projects.actions';

@Component({
  selector: 'app-projects-container',
  template: '<app-projects [userType]="this.userType"></app-projects>',
})
export class ProjectsContainer implements OnDestroy {
  readonly userType = localStorage.getItem('AuthUserType');

  constructor(private store$: Store<TrackMolaState>) {}

  public ngOnDestroy(): void {
    this.store$.dispatch(clearProjectStore());
  }
}

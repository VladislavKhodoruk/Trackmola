import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-container',
  template: '<app-projects [userType]="this.userType"></app-projects>',
})
export class ProjectsContainer {
  readonly userType: string = localStorage.getItem('AuthUserType');

  constructor(private store$: Store<TrackMolaState>) {}
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-team-container',
  template: `<app-report-constructor
    [userType]="this.userType"
  ></app-report-constructor>`,
})
export class ReportConstructorContainer {
  readonly userType: string = localStorage.getItem('AuthUserType');
  constructor(private store$: Store<TrackMolaState>) {}
}

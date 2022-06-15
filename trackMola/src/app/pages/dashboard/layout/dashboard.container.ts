import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserType } from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-dashboard-container',
  template: `<app-dashboard
    [userType]="this.userType$ | async"
  ></app-dashboard>`,
})
export class DashboardContainer {
  userType$: Observable<string>;
  constructor(private store: Store<TrackMolaState>) {
    this.userType$ = this.store.select(getUserType);
  }
}

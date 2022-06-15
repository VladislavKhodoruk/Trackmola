import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserType } from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-activity-container',
  template: '<app-activity [userType]="this.userType$ | async"></app-activity>',
})
export class ActivityContainer {
  userType$: Observable<string>;
  constructor(private store: Store<TrackMolaState>) {
    this.userType$ = this.store.select(getUserType);
  }
}

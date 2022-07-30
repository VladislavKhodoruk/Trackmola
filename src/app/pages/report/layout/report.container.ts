import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { getDate } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-report-container',
  template: `<app-employee-report
    [currentDate]="currentDate$ | async"
  ></app-employee-report>`,
})
export class ReportContainer {
  currentDate$ = this.store$.select(getDate);

  constructor(private store$: Store<TrackMolaState>) {}
}

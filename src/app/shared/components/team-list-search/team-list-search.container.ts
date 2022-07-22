import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ReportState } from '@pages/report/store/report.state';
import { getProjects } from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-team-list-search-container',
  template: `<app-team-list-search-component
    [allProjects]="allProjects$ | async"
  ></app-team-list-search-component>`,
})
export class TeamListSearchContainer {
  allProjects$ = this.commonStore$.select(getProjects);
  constructor(
    private reportStore$: Store<ReportState>,
    private commonStore$: Store<CommonState>,
    private store$: Store<TrackMolaState>
  ) {}
}

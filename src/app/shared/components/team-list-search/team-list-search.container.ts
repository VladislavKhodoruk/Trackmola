import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ReportState } from '@pages/report/store/report.state';
import {
  getProjects,
  locations,
  positions,
  projectsByUsers,
} from '@store/common/common.selectors';
import { CommonState } from '@store/common/common.state';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-team-list-search-container',
  template: `<app-team-list-search-component
    [allProjects]="allProjects$ | async"
    [projectsByUsers]="projectsByUsers$ | async"
    [locations]="locations$ | async"
    [positions]="positions$ | async"
  ></app-team-list-search-component>`,
})
export class TeamListSearchContainer {
  allProjects$ = this.commonStore$.select(getProjects);
  projectsByUsers$ = this.commonStore$.select(projectsByUsers);
  locations$ = this.commonStore$.select(locations);
  positions$ = this.commonStore$.select(positions);
  constructor(
    private reportStore$: Store<ReportState>,
    private commonStore$: Store<CommonState>,
    private store$: Store<TrackMolaState>
  ) {}
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { usersGroupByProject } from '@pages/projects/store/projects.selectors';
import { getUser } from '@pages/team/store/team.selectors';
import { TeamState } from '@pages/team/store/team.state';
import { projectsByUsers } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-manager-team-container',
  template: `<app-manager-team-component
    [pickedUser]="pickedUser$ | async"
    [projectsByUsers]="projectsByUsers$ | async"
    [usersByProject]="usersByProject$ | async"
  ></app-manager-team-component>`,
})
export class ManagerTeamContainer {
  pickedUser$ = this.teamStore$.select(getUser);

  projectsByUsers$ = this.store$.select(projectsByUsers);

  usersByProject$ = this.store$.select(usersGroupByProject);

  constructor(
    private store$: Store<TrackMolaState>,
    private teamStore$: Store<TeamState>
  ) {}
}

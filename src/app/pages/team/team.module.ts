import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TeamListSearchModule } from './../../shared/components/team-list-search/team-list-search.module';

import { AdminTeamComponent } from './components/admin-team/admin-team.component';
import { CtoTeamComponent } from './components/cto-team/cto-team.component';
import { ManagerTeamComponent } from './components/manager-team/manager-team.component';
import { TeamComponent } from './layout/team.component';
import { TeamContainer } from './layout/team.container';
import { TeamReducer } from './store/team.reducer';
import { TEAM_STATE_NAME } from './store/team.selectors';
import { TeamRoutes } from './team.router';

@NgModule({
  declarations: [
    AdminTeamComponent,
    CtoTeamComponent,
    ManagerTeamComponent,
    TeamComponent,
    TeamContainer,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(TEAM_STATE_NAME, TeamReducer),
    RouterModule.forChild(TeamRoutes),
    TeamListSearchModule,
  ],
  exports: [RouterModule],
})
export class TeamModule {}

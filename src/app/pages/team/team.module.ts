import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersProjectsComponent } from './components/users-projects/users-projects.component';
import { UsersProjectsContainer } from './components/users-projects/users-projects.container';
import { TeamComponent } from './layout/team.component';
import { TeamContainer } from './layout/team.container';
import { TeamEffects } from './store/team.effects';
import { TeamReducer } from './store/team.reducer';
import { TEAM_STATE_NAME } from './store/team.selectors';
import { TeamRoutes } from './team.router';

import { ProjectLabelModule } from '@shared/components/project-label/project-label.module';
import { TeamListSearchModule } from '@shared/components/team-list-search/team-list-search.module';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';
import { VacationsModule } from '@shared/components/vacations/vacations.module';
import { VisitCardModule } from '@shared/components/visit-card/visit-card.module';

@NgModule({
  declarations: [
    TeamComponent,
    TeamContainer,
    UsersProjectsComponent,
    UsersProjectsContainer,
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    EffectsModule.forFeature([TeamEffects]),
    StoreModule.forFeature(TEAM_STATE_NAME, TeamReducer),
    RouterModule.forChild(TeamRoutes),
    TeamListSearchModule,
    VisitCardModule,
    ProjectLabelModule,
    UsersPhotosModule,
    VacationsModule,
  ],
})
export class TeamModule {}

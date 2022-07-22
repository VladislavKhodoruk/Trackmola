import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IconModule } from '@visurel/iconify-angular';

import { ActiveTasksUsersComponent } from './components/active-tasks-users/active-tasks-users.component';
import { ActiveTasksUsersContainer } from './components/active-tasks-users/active-tasks-users.container';
import { ActiveTasksComponent } from './components/active-tasks/active-tasks.component';
import { ActiveTasksContainer } from './components/active-tasks/active-tasks.container';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsListContainer } from './components/projects-list/projects-list.container';
import { ProjectsTeamComponent } from './components/projects-team/projects-team.component';
import { ProjectsComponent } from './layout/projects.component';
import { ProjectsContainer } from './layout/projects.container';
import { SearchProjectsPipe } from './pipes/searchProjects.pipe';
import { ProjectsRoutes } from './projects.router';
import { ProjectsEffects } from './store/projects.effects';
import { ProjectsReducer } from './store/projects.reducer';
import { PROJECTS_STATE_NAME } from './store/projects.selectors';

import { ButtonModule } from '@shared/components/button/button.module';
import { ToggleButtonsModule } from '@shared/components/toggle-buttons/toggle-buttons.module';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';
import { VacationsModule } from '@shared/components/vacations/vacations.module';

@NgModule({
  declarations: [
    ProjectsContainer,
    ProjectsComponent,
    ProjectsListComponent,
    ProjectsListContainer,
    SearchProjectsPipe,
    ActiveTasksComponent,
    ActiveTasksContainer,
    ProjectsTeamComponent,
    ActiveTasksUsersComponent,
    ActiveTasksUsersContainer,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    UsersPhotosModule,
    MatExpansionModule,
    ButtonModule,
    EffectsModule.forFeature([ProjectsEffects]),
    StoreModule.forFeature(PROJECTS_STATE_NAME, ProjectsReducer),
    RouterModule.forChild(ProjectsRoutes),
    ToggleButtonsModule,
    VacationsModule,
  ],
  exports: [RouterModule],
})
export class ProjectsModule {}

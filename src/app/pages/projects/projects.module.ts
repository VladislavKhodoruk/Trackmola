import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';
import { IconModule } from '@visurel/iconify-angular';

import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';
import { CtoProjectsComponent } from './components/cto-projects/cto-projects.component';
import { EmployeeProjectsComponent } from './components/employee-projects/employee-projects.component';
import { EmployeeProjectsContainer } from './components/employee-projects/employee-projects.container';
import { ManagerProjectsComponent } from './components/manager-projects/manager-projects.component';
import { InputSearchComponent } from './components/projects-list/input-search/input-search.component';
import { InputSearchContainer } from './components/projects-list/input-search/input-search.container';
import { ProjectItemComponent } from './components/projects-list/project-item/project-item.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsListContainer } from './components/projects-list/projects-list.container';
import { ProjectsComponent } from './layout/projects.component';
import { ProjectsContainer } from './layout/projects.container';
import { SearchProjectsPipe } from './pipes/searchProjects.pipe';
import { ProjectsRoutes } from './projects.router';
import { ProjectsEffects } from './store/projects.effects';
import { ProjectsReducer } from './store/projects.reducer';
import { PROJECTS_STATE_NAME } from './store/projects.selectors';
import { ActiveTasksComponent } from './components/active-tasks/active-tasks.component';
import { ActiveTasksContainer } from './components/active-tasks/active-tasks.container';
import { ActiveTaskComponent } from './components/active-tasks/active-task/active-task.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ButtonModule } from '@shared/components/button/button.module';

@NgModule({
  declarations: [
    ManagerProjectsComponent,
    CtoProjectsComponent,
    EmployeeProjectsComponent,
    EmployeeProjectsContainer,
    AdminProjectsComponent,
    ProjectsContainer,
    ProjectsComponent,
    ProjectsListComponent,
    ProjectsListContainer,
    InputSearchComponent,
    InputSearchContainer,
    ProjectItemComponent,
    SearchProjectsPipe,
    ActiveTasksComponent,
    ActiveTasksContainer,
    ActiveTaskComponent,
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
  ],
  exports: [RouterModule],
})
export class ProjectsModule {}

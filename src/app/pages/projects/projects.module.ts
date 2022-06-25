import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectsRoutes } from './projects.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PROJECTS_STATE_NAME } from './store/projects.selectors';
import { ProjectsReducer } from './store/projects.reducer';
import { ManagerProjectsComponent } from './components/manager-projects/manager-projects.component';
import { CtoProjectsComponent } from './components/cto-projects/cto-projects.component';
import { EmployeeProjectsComponent } from './components/employee-projects/employee-projects.component';
import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';
import { ProjectsComponent } from './layout/projects.component';
import { ProjectsContainer } from './layout/projects.container';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectsListContainer } from './components/projects-list/projects-list.container';
import { InputSearchComponent } from './components/projects-list/input-search/input-search.component';
import { IconModule } from '@visurel/iconify-angular';
import { ProjectItemComponent } from './components/projects-list/project-item/project-item.component';
import { ProjectItemContainer } from './components/projects-list/project-item/project-item.container';
import { ProjectsEffects } from './store/projects.effects';

@NgModule({
  declarations: [
    ManagerProjectsComponent,
    CtoProjectsComponent,
    EmployeeProjectsComponent,
    AdminProjectsComponent,
    ProjectsContainer,
    ProjectsComponent,
    ProjectsListComponent,
    ProjectsListContainer,
    InputSearchComponent,
    ProjectItemComponent,
    ProjectItemContainer,
  ],
  imports: [
    CommonModule,
    IconModule,
    EffectsModule.forFeature([ProjectsEffects]),
    StoreModule.forFeature(PROJECTS_STATE_NAME, ProjectsReducer),
    RouterModule.forChild(ProjectsRoutes),
  ],
  exports: [RouterModule],
})
export class ProjectsModule {}

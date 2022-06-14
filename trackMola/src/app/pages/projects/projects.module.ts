import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectsRoutes } from './projects.router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PROJECTS_STATE_NAME } from './store/projects.selectors';
import { ProjectsReducer } from './store/projects.reducer';
import { ManagerProjectsComponent } from './components/manager-projects/manager-projects.component';
import { CtoProjectsComponent } from './components/cto-projects/cto-projects.component';
import { EmployeeProjectsComponent } from './components/employee-projects/employee-projects.component';
import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';

@NgModule({
  declarations: [
    ManagerProjectsComponent,
    CtoProjectsComponent,
    EmployeeProjectsComponent,
    AdminProjectsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(PROJECTS_STATE_NAME, ProjectsReducer),
    RouterModule.forChild(ProjectsRoutes),
  ],
  exports: [RouterModule],
})
export class ProjectsModule {}

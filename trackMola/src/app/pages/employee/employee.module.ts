import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EmployeeRoutes } from './employee.router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportComponent } from './components/report/report.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ActivityComponent } from './components/activity/activity.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EmployeeReducer } from './store/employee.reducer';
import { EMPLOYEE_STATE_NAME } from './store/employee.selectors';
import { EmployeeEffects } from './store/employee.effects';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    ProfileComponent,
    ReportComponent,
    ProjectsComponent,
    ActivityComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([EmployeeEffects]),
    StoreModule.forFeature(EMPLOYEE_STATE_NAME, EmployeeReducer),
    RouterModule.forChild(EmployeeRoutes),
  ],
  exports: [RouterModule],
})
export class EmployeeModule {}

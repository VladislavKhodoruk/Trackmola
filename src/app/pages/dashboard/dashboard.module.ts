import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutes } from './dashboard.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DASHBOARD_STATE_NAME } from './store/dashboard.selectors';
import { DashboardReducer } from './store/dashboard.reducer';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CtoDashboardComponent } from './components/cto-dashboard/cto-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { DashboardContainer } from './layout/dashboard.container';
import { DashboardComponent } from './layout/dashboard.component';
import { DashboardEffects } from './store/dashboard.effects';
import { WorkingHoursChartComponent } from './components/working-hours-chart/working-hours-chart.component';
import { WorkingHoursChartContainer } from './components/working-hours-chart/working-hours-chart.container';
import { ActiveTasksListModule } from '@pages/dashboard/components/active-tasks-list/active-tasks-list-module';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    CtoDashboardComponent,
    ManagerDashboardComponent,
    EmployeeDashboardComponent,
    DashboardComponent,
    DashboardContainer,
    WorkingHoursChartComponent,
    WorkingHoursChartContainer,
  ],
  imports: [
    ActiveTasksListModule,
    CommonModule,
    EffectsModule.forFeature([DashboardEffects]),
    StoreModule.forFeature(DASHBOARD_STATE_NAME, DashboardReducer),
    RouterModule.forChild(DashboardRoutes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class DashboardModule {}

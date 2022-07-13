import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CtoDashboardComponent } from './components/cto-dashboard/cto-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { WorkingHoursChartComponent } from './components/working-hours-chart/working-hours-chart.component';
import { WorkingHoursChartContainer } from './components/working-hours-chart/working-hours-chart.container';
import { DashboardRoutes } from './dashboard.router';
import { DashboardComponent } from './layout/dashboard.component';
import { DashboardContainer } from './layout/dashboard.container';
import { DashboardEffects } from './store/dashboard.effects';
import { DashboardReducer } from './store/dashboard.reducer';
import { DASHBOARD_STATE_NAME } from './store/dashboard.selectors';

import { CalendarModule } from '@shared/components/calendar/calendar.module';

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
    CommonModule,
    EffectsModule.forFeature([DashboardEffects]),
    StoreModule.forFeature(DASHBOARD_STATE_NAME, DashboardReducer),
    RouterModule.forChild(DashboardRoutes),
    CalendarModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class DashboardModule {}

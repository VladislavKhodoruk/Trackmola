import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IconModule } from '@visurel/iconify-angular';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CtoDashboardComponent } from './components/cto-dashboard/cto-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ManagerControlsComponent } from './components/manager-controls/manager-controls.component';

import { ManagerControlsContainer } from './components/manager-controls/manager-controls.container';
import { ManagerDashboardListTasksComponent } from './components/manager-dashboard-list-tasks/manager-dashboard-list-tasks.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerDashboardContainer } from './components/manager-dashboard/manager-dashboard.container';
import { WorkingHoursChartComponent } from './components/working-hours-chart/working-hours-chart.component';
import { WorkingHoursChartContainer } from './components/working-hours-chart/working-hours-chart.container';
import { DashboardRoutes } from './dashboard.router';
import { DashboardComponent } from './layout/dashboard.component';
import { DashboardContainer } from './layout/dashboard.container';
import { DashboardEffects } from './store/dashboard.effects';
import { DashboardReducer } from './store/dashboard.reducer';
import { DASHBOARD_STATE_NAME } from './store/dashboard.selectors';

import { ActiveTasksListModule } from '@pages/dashboard/components/active-tasks-list/active-tasks-list-module';
import { ActivityWeekChartComponent } from '@pages/dashboard/components/activity-week-chart/activity-week-chart.component';
import { ActivityWeekChartContainer } from '@pages/dashboard/components/activity-week-chart/activity-week-chart.container';
import { ButtonModule } from '@shared/components/button/button.module';
import { CalendarModule } from '@shared/components/calendar/calendar.module';
import { ClockModule } from '@shared/components/clock/clock.module';
import { HighchartsChartModule } from '@shared/components/highcharts-chart/highcharts-chart.module';
import { ProjectLabelModule } from '@shared/components/project-label/project-label.module';
import { TodayViewModule } from '@shared/components/todayview/todayview.module';
import { VacationsModule } from '@shared/components/vacations/vacations.module';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    CtoDashboardComponent,
    ManagerDashboardComponent,
    ManagerDashboardContainer,
    EmployeeDashboardComponent,
    DashboardComponent,
    DashboardContainer,
    WorkingHoursChartComponent,
    WorkingHoursChartContainer,
    ActivityWeekChartContainer,
    ActivityWeekChartComponent,
    ManagerControlsContainer,
    HeaderComponent,
    ManagerControlsComponent,
    ManagerDashboardListTasksComponent,
  ],
  exports: [RouterModule],
  imports: [
    ActiveTasksListModule,
    CommonModule,
    EffectsModule.forFeature([DashboardEffects]),
    StoreModule.forFeature(DASHBOARD_STATE_NAME, DashboardReducer),
    RouterModule.forChild(DashboardRoutes),
    CalendarModule,
    HighchartsChartModule,
    TodayViewModule,
    ClockModule,
    VacationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    IconModule,
    ReactiveFormsModule,
    ButtonModule,
    ProjectLabelModule,
  ],
  providers: [],
})
export class DashboardModule {}

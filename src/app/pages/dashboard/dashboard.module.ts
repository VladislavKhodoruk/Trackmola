import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IconModule } from '@visurel/iconify-angular';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDashboardContainer } from './components/admin-dashboard/admin-dashboard.container';
import { CtoDashboardComponent } from './components/cto-dashboard/cto-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderContainer } from './components/header/header.container';
import { ManagerControlsComponent } from './components/manager-controls/manager-controls.component';

import { ManagerControlsContainer } from './components/manager-controls/manager-controls.container';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { ManagerDashboardContainer } from './components/manager-dashboard/manager-dashboard.container';
import { UsersCardsComponent } from './components/users-cards/users-cards.component';
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
import { ChartProjectsModule } from '@shared/components/chart-projects/chart-projects.module';
import { ClockModule } from '@shared/components/clock/clock.module';
import { DatepickerModule } from '@shared/components/datepicker/datepicker.module';
import { HighchartsChartModule } from '@shared/components/highcharts-chart/highcharts-chart.module';
import { HolidaysModule } from '@shared/components/holiday/holidays.module';
import { ProjectLabelModule } from '@shared/components/project-label/project-label.module';
import { SelectModule } from '@shared/components/select/select.module';
import { TodayViewModule } from '@shared/components/todayview/todayview.module';
import { ToggleButtonsModule } from '@shared/components/toggle-buttons/toggle-buttons.module';
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
    HeaderContainer,
    ManagerControlsComponent,
    UsersCardsComponent,
    AdminDashboardContainer,
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
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ProjectLabelModule,
    ToggleButtonsModule,
    HolidaysModule,
    SelectModule,
    DatepickerModule,
    ChartProjectsModule,
  ],
  providers: [],
})
export class DashboardModule {}

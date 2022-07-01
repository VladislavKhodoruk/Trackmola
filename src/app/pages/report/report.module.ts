import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportRoutes } from './report.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { REPORT_STATE_NAME } from './store/report.selectors';
import { ReportReducer } from './store/report.reducer';
import { AdminReportComponent } from './components/admin-report/admin-report.component';
import { CtoReportComponent } from './components/cto-report/cto-report.component';
import { ManagerReportComponent } from './components/manager-report/manager-report.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';
import { ReportContainer } from './layout/report.container';
import { ReportComponent } from './layout/report.component';
import { IconModule } from '@visurel/iconify-angular';
import { CalendarModule } from '@shared/components/calendar/calendar.module';
import { NavigatinonCalendarModule } from '@shared/components/navigatinon-calendar/navigatinon-calendar.module';
import { ButtonModule } from '@shared/components/button/button.module';
import { ReportInputModule } from './components/report-input/report-input.module';
import { ReportEffects } from './store/report.effects';

@NgModule({
  declarations: [
    AdminReportComponent,
    CtoReportComponent,
    ManagerReportComponent,
    EmployeeReportComponent,
    ReportComponent,
    ReportContainer,
  ],
  imports: [
    CommonModule,
    IconModule,
    NavigatinonCalendarModule,
    ButtonModule,
    EffectsModule.forFeature([ReportEffects]),
    StoreModule.forFeature(REPORT_STATE_NAME, ReportReducer),
    RouterModule.forChild(ReportRoutes),
    CalendarModule,
    ReportInputModule,
  ],
  exports: [RouterModule],
})
export class ReportModule {}

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportRoutes } from './report.router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PREPORT_STATE_NAME } from './store/report.selectors';
import { ReportReducer } from './store/report.reducer';
import { AdminReportComponent } from './components/admin-report/admin-report.component';
import { CtoReportComponent } from './components/cto-report/cto-report.component';
import { ManagerReportComponent } from './components/manager-report/manager-report.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';
import { ReportContainer } from './layout/report.container';
import { ReportComponent } from './layout/report.component';

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
    SharedModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(PREPORT_STATE_NAME, ReportReducer),
    RouterModule.forChild(ReportRoutes),
  ],
  exports: [RouterModule],
})
export class ReportModule {}

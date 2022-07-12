import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportConstructorComponent } from './layout/report-constructor.component';
import { ReportConstructorContainer } from './layout/report-constructor.container';
import { CtoReportConstructorComponent } from './components/cto-report-constructor/cto-report-constructor.component';
import { AdminReportConstructorComponent } from './components/admin-report-constructor/admin-report-constructor.component';
import { ManagerReportConstructorComponent } from './components/manager-report-constructor/manager-report-constructor.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReportConstructorReducer } from './store/report-constructor.reducer';
import { REPORT_CONSTRUCTOR_STATE_NAME } from './store/report-constructor.selectors';
import { ReportConstructorRoutes } from './report-constructor.router';
import { ReportConstructorEffects } from './store/report-constructor.effects';
import { ButtonModule } from '@shared/components/button/button.module';
import { IconModule } from '@visurel/iconify-angular';
import { SelectModule } from '@shared/components/select/select.module';
import { ManagerReportConstructorContainer } from './components/manager-report-constructor/manager-report-constructor.container';
import { DateSwitchModule } from '@shared/components/date-switch/date-switch.module';
import { DatepickerModule } from '@shared/components/datepicker/datepicker.module';
import { ReportConstructorTableComponent } from './components/report-constructor-table/report-constructor-table.component';

@NgModule({
  declarations: [
    ReportConstructorComponent,
    ReportConstructorContainer,
    CtoReportConstructorComponent,
    AdminReportConstructorComponent,
    ManagerReportConstructorComponent,
    ManagerReportConstructorContainer,
    ReportConstructorTableComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ReportConstructorEffects]),
    StoreModule.forFeature(
      REPORT_CONSTRUCTOR_STATE_NAME,
      ReportConstructorReducer
    ),
    RouterModule.forChild(ReportConstructorRoutes),
    ButtonModule,
    IconModule,
    SelectModule,
    DateSwitchModule,
    DatepickerModule,
  ],
  exports: [RouterModule],
})
export class ReportConstructorModule {}

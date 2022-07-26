import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';

import { IconModule } from '@visurel/iconify-angular';

import { AdminReportConstructorComponent } from './components/admin-report-constructor/admin-report-constructor.component';
import { CtoReportConstructorComponent } from './components/cto-report-constructor/cto-report-constructor.component';
import { ManagerReportConstructorComponent } from './components/manager-report-constructor/manager-report-constructor.component';
import { ManagerReportConstructorContainer } from './components/manager-report-constructor/manager-report-constructor.container';

import { ReportConstructorTableComponent } from './components/report-constructor-table/report-constructor-table.component';
import { ReportConstructorComponent } from './layout/report-constructor.component';
import { ReportConstructorContainer } from './layout/report-constructor.container';

import { ReportConstructorRoutes } from './report-constructor.router';
import { ReportConstructorEffects } from './store/report-constructor.effects';

import { ReportConstructorReducer } from './store/report-constructor.reducer';
import { REPORT_CONSTRUCTOR_STATE_NAME } from './store/report-constructor.selectors';

import { ButtonModule } from '@shared/components/button/button.module';
import { DateSwitchModule } from '@shared/components/date-switch/date-switch.module';
import { DatepickerModule } from '@shared/components/datepicker/datepicker.module';
import { SelectModule } from '@shared/components/select/select.module';
import { ToggleButtonsModule } from '@shared/components/toggle-buttons/toggle-buttons.module';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';

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
  exports: [RouterModule],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ReportConstructorEffects]),
    StoreModule.forFeature(
      REPORT_CONSTRUCTOR_STATE_NAME,
      ReportConstructorReducer
    ),
    RouterModule.forChild(ReportConstructorRoutes),
    ButtonModule,
    ToggleButtonsModule,
    IconModule,
    SelectModule,
    DateSwitchModule,
    DatepickerModule,
    UsersPhotosModule,
  ],
})
export class ReportConstructorModule {}

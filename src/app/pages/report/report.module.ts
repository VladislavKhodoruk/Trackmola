import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IconModule } from '@visurel/iconify-angular';

import { ReportSendModalComponent } from './components/report-send-modal/report-send-modal.component';
import { ReportSendModalContainer } from './components/report-send-modal/report-send-modal.container';
import { TaskTracksComponent } from './components/report-send-modal/tasktracks/tasktracks.component';
import { TaskTracksContainer } from './components/report-send-modal/tasktracks/tasktracks.container';
import { ReportComponent } from './layout/report.component';
import { ReportContainer } from './layout/report.container';
import { ReportRoutes } from './report.router';
import { ReportEffects } from './store/report.effects';
import { ReportReducer } from './store/report.reducer';
import { REPORT_STATE_NAME } from './store/report.selectors';

import { ButtonModule } from '@shared/components/button/button.module';
import { CalendarModule } from '@shared/components/calendar/calendar.module';
import { NavigationCalendarModule } from '@shared/components/navigatinon-calendar/navigation-calendar.module';

import { ProjectLabelModule } from '@shared/components/project-label/project-label.module';
import { ReportInputModule } from '@shared/components/report-input/report-input.module';
import { TodayViewModule } from '@shared/components/todayview/todayview.module';
import { ToggleButtonsModule } from '@shared/components/toggle-buttons/toggle-buttons.module';
import { UsersPhotosModule } from '@shared/components/users-photos/users-photos.module';
import { VacationsModule } from '@shared/components/vacations/vacations.module';
@NgModule({
  declarations: [
    ReportComponent,
    ReportContainer,
    ReportSendModalComponent,
    ReportSendModalContainer,
    TaskTracksComponent,
    TaskTracksContainer,
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    IconModule,
    NavigationCalendarModule,
    ButtonModule,
    EffectsModule.forFeature([ReportEffects]),
    StoreModule.forFeature(REPORT_STATE_NAME, ReportReducer),
    RouterModule.forChild(ReportRoutes),
    CalendarModule,
    ReportInputModule,
    TodayViewModule,
    MatDialogModule,
    MatExpansionModule,

    FormsModule,
    ReactiveFormsModule,

    UsersPhotosModule,
    ToggleButtonsModule,
    VacationsModule,

    ProjectLabelModule,
  ],
})
export class ReportModule {}

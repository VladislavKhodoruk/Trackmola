import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ActivityRoutes } from './activity.router';

import { ActivityTotalCardsItemComponent } from './components/activity-total-cards/activity-total-cards-item/activity-total-cards-item.component';
import { ActivityTotalCardsComponent } from './components/activity-total-cards/activity-total-cards.component';
import { ActivityTotalCardsContainer } from './components/activity-total-cards/activity-total-cards.container';
import { AdminActivityComponent } from './components/admin-activity/admin-activity.component';
import { CtoActivityComponent } from './components/cto-activity/cto-activity.component';
import { EmployeeActivityComponent } from './components/employee-activity/employee-activity.component';
import { EmployeeActivityContainer } from './components/employee-activity/employee-activity.container';
import { ManagerActivityComponent } from './components/manager-activity/manager-activity.component';
import { ProjectsActivityComponent } from './components/projects-activity/projects-activity.component';

import { ProjectsActivityContainer } from './components/projects-activity/projects-activity.container';
import { ActivityComponent } from './layout/activity.component';
import { ActivityContainer } from './layout/activity.container';
import { ActivityEffects } from './store/activity.effects';
import { ActivityReducer } from './store/activity.reducer';
import { ACTIVITY_STATE_NAME } from './store/activity.selectors';

import { ButtonModule } from '@shared/components/button/button.module';
import { HighchartsChartModule } from '@shared/components/highcharts-chart/highcharts-chart.module';
import { ToggleButtonsModule } from '@shared/components/toggle-buttons/toggle-buttons.module';

@NgModule({
  declarations: [
    EmployeeActivityComponent,
    EmployeeActivityContainer,
    CtoActivityComponent,
    AdminActivityComponent,
    ManagerActivityComponent,
    ActivityContainer,
    ActivityComponent,
    ProjectsActivityComponent,
    ProjectsActivityContainer,
    ActivityTotalCardsComponent,
    ActivityTotalCardsContainer,
    ActivityTotalCardsItemComponent,
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    EffectsModule.forFeature([ActivityEffects]),
    StoreModule.forFeature(ACTIVITY_STATE_NAME, ActivityReducer),
    RouterModule.forChild(ActivityRoutes),
    ToggleButtonsModule,
    ButtonModule,
  ],
  exports: [RouterModule],
})
export class ActivityModule {}

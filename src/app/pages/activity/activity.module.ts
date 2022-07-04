import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityRoutes } from './activity.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ACTIVITY_STATE_NAME } from './store/activity.selectors';
import { ActivityReducer } from './store/activity.reducer';
import { EmployeeActivityComponent } from './components/employee-activity/employee-activity.component';
import { CtoActivityComponent } from './components/cto-activity/cto-activity.component';
import { AdminActivityComponent } from './components/admin-activity/admin-activity.component';
import { ManagerActivityComponent } from './components/manager-activity/manager-activity.component';
import { ActivityContainer } from './layout/activity.container';
import { ActivityComponent } from './layout/activity.component';
import { ActivityTotalCardsComponent } from './components/activity-total-cards/activity-total-cards.component';
import { ActivityTotalCardsContainer } from './components/activity-total-cards/activity-total-cards.container';
import { ActivityTotalCardsItemComponent } from './components/activity-total-cards/activity-total-cards-item/activity-total-cards-item.component';
import { EmployeeActivityContainer } from './components/employee-activity/employee-activity.container';
import { ActivityEffects } from './store/activity.effects';

@NgModule({
  declarations: [
    EmployeeActivityComponent,
    EmployeeActivityContainer,
    CtoActivityComponent,
    AdminActivityComponent,
    ManagerActivityComponent,
    ActivityContainer,
    ActivityComponent,
    ActivityTotalCardsComponent,
    ActivityTotalCardsContainer,
    ActivityTotalCardsItemComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([ActivityEffects]),
    StoreModule.forFeature(ACTIVITY_STATE_NAME, ActivityReducer),
    RouterModule.forChild(ActivityRoutes),
  ],
  exports: [RouterModule],
})
export class ActivityModule {}

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivityRoutes } from './activity.router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ACTIVITY_STATE_NAME } from './store/activity.selectors';
import { ActivityReducer } from './store/activity.reducer';
import { EmployeeActivityComponent } from './components/employee-activity/employee-activity.component';
import { CtoActivityComponent } from './components/cto-activity/cto-activity.component';
import { AdminActivityComponent } from './components/admin-activity/admin-activity.component';
import { ManagerActivityComponent } from './components/manager-activity/manager-activity.component';

@NgModule({
  declarations: [
    EmployeeActivityComponent,
    CtoActivityComponent,
    AdminActivityComponent,
    ManagerActivityComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(ACTIVITY_STATE_NAME, ActivityReducer),
    RouterModule.forChild(ActivityRoutes),
  ],
  exports: [RouterModule],
})
export class ActivitydModule {}

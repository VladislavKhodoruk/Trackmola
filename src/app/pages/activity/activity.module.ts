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
import { ProjectsActivityComponent } from './components/projects-activity/projects-activity.component';
import { HighchartsChartModule } from '@shared/components/highcharts-chart/highcharts-chart.module';
import { ProjectsActivityContainer } from './components/projects-activity/projects-activity.container';

@NgModule({
  declarations: [
    EmployeeActivityComponent,
    CtoActivityComponent,
    AdminActivityComponent,
    ManagerActivityComponent,
    ActivityContainer,
    ActivityComponent,
    ProjectsActivityComponent,
    ProjectsActivityContainer,
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(ACTIVITY_STATE_NAME, ActivityReducer),
    RouterModule.forChild(ActivityRoutes),
  ],
  exports: [RouterModule],
})
export class ActivityModule {}

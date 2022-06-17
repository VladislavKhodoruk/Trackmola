import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardRoutes } from './dashboard.router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DASHBOARD_STATE_NAME } from './store/dashboard.selectors';
import { DashboardReducer } from './store/dashboard.reducer';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CtoDashboardComponent } from './components/cto-dashboard/cto-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { DashboardContainer } from './layout/dashboard.container';
import { DashboardComponent } from './layout/dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    CtoDashboardComponent,
    ManagerDashboardComponent,
    EmployeeDashboardComponent,
    DashboardComponent,
    DashboardContainer,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(DASHBOARD_STATE_NAME, DashboardReducer),
    RouterModule.forChild(DashboardRoutes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class DashboardModule {}

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { SharedModule } from '../common/shared.module';
import { AuthGuard } from '../common/services/auth.guard';

@NgModule({
  declarations: [DashboardPageComponent, EmployeeLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: '/employee/dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardPageComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class EmployeeModule {}

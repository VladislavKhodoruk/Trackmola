import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';
import { SharedModule } from '../common/shared.module';
import { EmployeeRoutes } from './employee.router';

@NgModule({
  declarations: [DashboardPageComponent, EmployeeLayoutComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(EmployeeRoutes)],
  exports: [RouterModule],
})
export class EmployeeModule {}

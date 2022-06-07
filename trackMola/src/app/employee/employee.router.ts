import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',
    component: EmployeeLayoutComponent,

    children: [
      { path: '', redirectTo: '/employee/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
    ],
  },
];

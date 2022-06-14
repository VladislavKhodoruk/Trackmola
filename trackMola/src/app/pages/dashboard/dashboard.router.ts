import { Routes } from '@angular/router';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { CtoGuard } from 'src/app/shared/guards/cto.guard';
import { EmployeeGuard } from 'src/app/shared/guards/employee.guard';
import { ManagerGuard } from 'src/app/shared/guards/manager.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CtoDashboardComponent } from './components/cto-dashboard/cto-dashboard.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './components/manager-dashboard/manager-dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: '',
        component: CtoDashboardComponent,
        canActivate: [CtoGuard],
      },
      {
        path: '',
        component: EmployeeDashboardComponent,
        canActivate: [EmployeeGuard],
      },
      {
        path: '',
        component: ManagerDashboardComponent,
        canActivate: [ManagerGuard],
      },

      { path: '**', redirectTo: '' },
    ],
  },
];

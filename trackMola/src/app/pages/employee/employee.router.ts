import { Routes } from '@angular/router';
import { UserType } from 'src/app/shared/enums/enum';
import { ActivityComponent } from './components/activity/activity.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ReportComponent } from './components/report/report.component';
import { EmployeeGuard } from './employee.guard';

export const EmployeeRoutes: Routes = [
  {
    path: '',

    children: [
      { path: '', redirectTo: '/employee/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [EmployeeGuard],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [EmployeeGuard],
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [EmployeeGuard],
      },
      {
        path: 'activity',
        component: ActivityComponent,
        canActivate: [EmployeeGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [EmployeeGuard],
      },
      { path: '**', redirectTo: '/employee/dashboard' },
    ],
  },
];

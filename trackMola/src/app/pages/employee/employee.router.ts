import { Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ReportComponent } from './components/report/report.component';

export const EmployeeRoutes: Routes = [
  {
    path: '',

    children: [
      { path: '', redirectTo: '/employee/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'report', component: ReportComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: '/employee/dashboard' },
    ],
  },
];

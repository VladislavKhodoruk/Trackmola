import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'authrorization', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
  },
  {
    path: 'authrorization',
    loadChildren: () =>
      import('./pages/authrorization/authrorization.module').then(
        (x) => x.AuthorizationModule
      ),
  },
  { path: '**', redirectTo: 'authrorization' },
];

import { Routes } from '@angular/router';
import { AuthorizationGuard } from './pages/authorization/authorization.guard';

import { IsAuthentificated } from './shared/guards/IsAuthentificated.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'authorization', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    canActivate: [AuthorizationGuard, IsAuthentificated],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
    canActivate: [AuthorizationGuard, IsAuthentificated],
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
    canActivate: [AuthorizationGuard, IsAuthentificated],
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
    canActivate: [AuthorizationGuard, IsAuthentificated],
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
    canActivate: [AuthorizationGuard, IsAuthentificated],
  },
  {
    path: 'authorization',
    loadChildren: () =>
      import('./pages/authorization/authorization.module').then(
        (x) => x.AuthorizationModule
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];

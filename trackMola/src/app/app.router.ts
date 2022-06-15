import { Routes } from '@angular/router';
import { authorizationGuard } from './pages/authorization/authorization.guard';

import { IsAuthentificated } from './shared/guards/IsAuthentificated.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'authorization', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    canActivate: [authorizationGuard, IsAuthentificated],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
    canActivate: [authorizationGuard, IsAuthentificated],
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
    canActivate: [authorizationGuard, IsAuthentificated],
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
    canActivate: [authorizationGuard, IsAuthentificated],
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
    canActivate: [authorizationGuard, IsAuthentificated],
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

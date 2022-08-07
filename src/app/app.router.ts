import { Routes } from '@angular/router';

import { AuthorizationGuard } from './pages/authorization/authorization.guard';

import { IsAuthenticated } from '@shared/guards/IsAuthentificated.guard';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authorization' },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    path: 'dashboard',
    title: 'Dashboard',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
    path: 'profile',
    title: 'Profile',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
    path: 'activity',
    title: 'Activity',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
    path: 'projects',
    title: 'Projects',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
    path: 'report',
    title: 'Report',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/team/team.module').then((x) => x.TeamModule),
    path: 'team',
    title: 'Team',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/report-constructor/report-constructor.module').then(
        (x) => x.ReportConstructorModule
      ),
    path: 'report-constructor',
    title: 'Report constructor',
  },
  {
    canActivate: [IsAuthenticated],
    loadChildren: () =>
      import('./pages/authorization/authorization.module').then(
        (x) => x.AuthorizationModule
      ),
    path: 'authorization',
    title: 'Authorization',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/vacations/vacations.module').then(
        (x) => x.VacationsModule
      ),
    path: 'vacations',
    title: 'Vacations',
  },
  { path: '**', redirectTo: 'dashboard' },
];

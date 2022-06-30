import { Routes } from '@angular/router';
import { AuthorizationGuard } from './pages/authorization/authorization.guard';
import { IsAuthentificated } from '@shared/guards/IsAuthentificated.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'authorization', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./pages/team/team.module').then((x) => x.TeamModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'authorization',
    loadChildren: () =>
      import('./pages/authorization/authorization.module').then(
        (x) => x.AuthorizationModule
      ),
    canActivate: [IsAuthentificated],
  },
  { path: '**', redirectTo: 'dashboard' },
];

import { Routes } from '@angular/router';
import { AuthorizationGuard } from './pages/authorization/authorization.guard';
import { IsAuthenticated } from '@shared/guards/IsAuthentificated.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'authorization', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    canActivate: [AuthorizationGuard],
    title: 'Dashboard',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
    canActivate: [AuthorizationGuard],
    title: 'Profile',
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
    canActivate: [AuthorizationGuard],
    title: 'Activity',
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
    canActivate: [AuthorizationGuard],
    title: 'Projects',
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
    canActivate: [AuthorizationGuard],
    title: 'Report',
  },
  {
    path: 'team',
    loadChildren: () =>
      import('./pages/team/team.module').then((x) => x.TeamModule),
    canActivate: [AuthorizationGuard],
    title: 'Team',
  },
  {
    path: 'report-constructor',
    loadChildren: () =>
      import('./pages/report-constructor/report-constructor.module').then(
        (x) => x.ReportConstructorModule
      ),
    canActivate: [AuthorizationGuard],
    title: 'Team',
  },
  {
    path: 'authorization',
    loadChildren: () =>
      import('./pages/authorization/authorization.module').then(
        (x) => x.AuthorizationModule
      ),
    canActivate: [IsAuthenticated],
    title: 'Authorization',
  },
  { path: '**', redirectTo: 'dashboard' },
];

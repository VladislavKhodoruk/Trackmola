import { Routes } from '@angular/router';
import { AuthrorizationGuard } from './pages/authrorization/authrorization.guard';
import { IsAuthentificated } from './shared/guards/IsAuthentificated.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'authrorization', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    canActivate: [AuthrorizationGuard, IsAuthentificated],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
    canActivate: [AuthrorizationGuard, IsAuthentificated],
  },
  {
    path: 'activity',
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
    canActivate: [AuthrorizationGuard, IsAuthentificated],
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
    canActivate: [AuthrorizationGuard, IsAuthentificated],
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
    canActivate: [AuthrorizationGuard, IsAuthentificated],
  },
  {
    path: 'authrorization',
    loadChildren: () =>
      import('./pages/authrorization/authrorization.module').then(
        (x) => x.AuthorizationModule
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];

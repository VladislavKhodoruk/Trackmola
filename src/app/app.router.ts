import { Routes } from '@angular/router';

import { AuthorizationGuard } from './pages/authorization/authorization.guard';

import { Route } from '@shared/enums/enum';
import { IsAuthenticated } from '@shared/guards/IsAuthentificated.guard';

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authorization' },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
    path: Route.Dashboard,
    title: 'Dashboard',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module').then((x) => x.ProfileModule),
    path: Route.Profile,
    title: 'Profile',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/activity/activity.module').then((x) => x.ActivityModule),
    path: Route.MyActivity,
    title: 'My Activity',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/projects/projects.module').then((x) => x.ProjectsModule),
    path: Route.Projects,
    title: 'Projects',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/report/report.module').then((x) => x.ReportModule),
    path: Route.MyReport,
    title: 'My Report',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/team/team.module').then((x) => x.TeamModule),
    path: Route.Team,
    title: 'Team',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/report-constructor/report-constructor.module').then(
        (x) => x.ReportConstructorModule
      ),
    path: Route.ReportConstructor,
    title: 'Report constructor',
  },
  {
    canActivate: [IsAuthenticated],
    loadChildren: () =>
      import('./pages/authorization/authorization.module').then(
        (x) => x.AuthorizationModule
      ),
    path: Route.Authorization,
    title: 'Authorization',
  },
  {
    canActivate: [AuthorizationGuard],
    loadChildren: () =>
      import('./pages/vacations/vacations.module').then(
        (x) => x.VacationsModule
      ),
    path: Route.Vacations,
    title: 'Vacations',
  },
  { path: '**', redirectTo: Route.Dashboard },
];

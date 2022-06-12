import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthrorizationGuard } from './pages/authrorization/authrorization.guard';

const routes: Routes = [
  { path: '', redirectTo: 'authrorization', pathMatch: 'full' },
  {
    path: 'employee',
    loadChildren: () =>
      import('./pages/employee/employee.module').then((x) => x.EmployeeModule),
    canActivate: [AuthrorizationGuard],
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

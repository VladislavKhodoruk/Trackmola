import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'authrorization', pathMatch: 'full' },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.module').then((x) => x.EmployeeModule),
  },
  {
    path: 'authrorization',
    loadChildren: () =>
      import('./authrorization/authrorization.module').then(
        (x) => x.AuthorizationModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

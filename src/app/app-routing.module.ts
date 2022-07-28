import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AppRoutes } from './app.router';

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthrorizationRoutes } from './authrorization.router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AuthrorizationRoutes),
  ],
  exports: [RouterModule],
})
export class AuthorizationModule {}

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthrorizationRoutes } from './authrorization.router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { AUTH_STATE_NAME } from './store/authrorization.selector';
import { AuthrorizationReducer } from './store/authrorization.reducer';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthrorizationReducer),
    RouterModule.forChild(AuthrorizationRoutes),
  ],
  exports: [RouterModule],
})
export class AuthorizationModule {}

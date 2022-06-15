import { LoginContainer } from './components/login/login.container';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from './services/authorization.service';
import { AuthorizationReducer } from './store/authorization.reducer';
import { AUTH_STATE_NAME } from './store/authorization.selector';
import { authorizationRoutes } from './authorization.router';

@NgModule({
  declarations: [LoginComponent, LoginContainer],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthorizationReducer),
    RouterModule.forChild(authorizationRoutes),
  ],
  exports: [RouterModule],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}

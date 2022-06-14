import { LoginContainer } from './components/login/login.container';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { AuthrorizationRoutes } from './authrorization.router';
import { CommonModule } from '@angular/common';
import { AUTH_STATE_NAME } from './store/authrorization.selector';
import { AuthrorizationReducer } from './store/authrorization.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, LoginContainer],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthrorizationReducer),
    RouterModule.forChild(AuthrorizationRoutes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AuthorizationModule {}

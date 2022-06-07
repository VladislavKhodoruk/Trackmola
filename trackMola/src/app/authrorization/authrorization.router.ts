import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

export const AuthrorizationRoutes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];

import { Routes } from '@angular/router';
import { LoginContainer } from './components/login/login.container';

export const AuthrorizationRoutes: Routes = [
  {
    path: '',
    component: LoginContainer,
  },
];

import { Routes } from '@angular/router';

import { LoginContainer } from './components/login/login.container';

export const authorizationRoutes: Routes = [
  {
    component: LoginContainer,
    path: '',
  },
];

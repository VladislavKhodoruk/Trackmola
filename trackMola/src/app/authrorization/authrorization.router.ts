import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

export const AuthrorizationRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
    ],
  },
];

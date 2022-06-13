import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/pages/authrorization/store/authrorization.actions';
import { getUserData } from 'src/app/pages/employee/store/employee.actions';
import { getNavigationElems } from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { getUserPhoto } from '../../../pages/employee/store/employee.selectors';
import { NavigationItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-sidebar-container',
  template: `<app-sidebar
    [photo]="this.userPhoto$ | async"
    [navItems]="this.navigationItems$ | async"
    (logoutEmmiter)="onLogout()"
  ></app-sidebar>`,
})
export class SidebarContainer {
  userPhoto$: Observable<string>;
  navigationItems$!: Observable<NavigationItem[] | null>;

  constructor(private store: Store<TrackMolaState>) {
    this.store.dispatch(getUserData());
    this.userPhoto$ = this.store.select(getUserPhoto);
    this.navigationItems$ = this.store.select(getNavigationElems);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}

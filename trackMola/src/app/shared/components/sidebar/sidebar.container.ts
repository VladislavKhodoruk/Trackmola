import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/pages/authrorization/store/authrorization.actions';
import { getUserData } from 'src/app/pages/employee/store/employee.actions';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { getUserPhoto } from '../../../pages/employee/store/employee.selectors';

@Component({
  selector: 'app-sidebar-container',
  template: `<app-sidebar
    [photo]="this.userPhoto$ | async"
    (logoutEmmiter)="onLogout()"
  ></app-sidebar>`,
})
export class SidebarContainer {
  userPhoto$: Observable<string>;

  constructor(private store: Store<TrackMolaState>) {
    this.store.dispatch(getUserData());
    this.userPhoto$ = this.store.select(getUserPhoto);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}

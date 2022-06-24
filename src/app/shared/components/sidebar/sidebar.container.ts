import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getNavigationElems,
  getUserPhoto,
} from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-sidebar-container',
  template: `<app-sidebar
    [photo]="this.userPhoto$ | async"
    [navItems]="this.navigationItems$ | async"
  ></app-sidebar>`,
})
export class SidebarContainer {
  userPhoto$ = this.store$.select(getUserPhoto);
  navigationItems$ = this.store$.select(getNavigationElems);

  constructor(private store$: Store<TrackMolaState>) {}
}

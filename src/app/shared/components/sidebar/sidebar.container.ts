import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getNavigationElems } from '@shared/helpers/helpers';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-sidebar-container',
  template: `<app-sidebar
    [photo]="this.userPhoto"
    [navItems]="this.navigationItems"
  ></app-sidebar>`,
})
export class SidebarContainer {
  userPhoto = localStorage.getItem('AuthUserPhoto');
  navigationItems = getNavigationElems(localStorage.getItem('AuthUserType'));

  constructor(private store$: Store<TrackMolaState>) {}
}

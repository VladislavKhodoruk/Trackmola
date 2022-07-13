import { Component } from '@angular/core';

import { getNavigationElems } from '@shared/constants/constants';
import { NavigationItem } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-sidebar-container',
  template: `<app-sidebar
      [photo]="this.userPhoto"
      [navItems]="this.navigationItems"
    ></app-sidebar
    >> > > > >`,
})
export class SidebarContainer {
  readonly userPhoto: string = localStorage.getItem('AuthUserPhoto');
  readonly navigationItems: NavigationItem[] = getNavigationElems(
    localStorage.getItem('AuthUserType')
  );
}

import { Component } from '@angular/core';
import { getNavigationElems } from '@shared/helpers/helpers';

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
}

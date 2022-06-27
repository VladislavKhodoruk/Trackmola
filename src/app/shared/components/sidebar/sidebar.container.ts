import { Component } from '@angular/core';
import { getNavigationElems } from '@shared/constants/constants';

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

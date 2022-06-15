import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getNavigationElems,
  getUserPhoto,
} from 'src/app/store/shared/shared.selectors';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { NavigationItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-sidebar-container',
  template: `<app-sidebar
    [photo]="this.userPhoto$ | async"
    [navItems]="this.navigationItems$ | async"
  ></app-sidebar>`,
})
export class SidebarContainer {
  userPhoto$: Observable<string>;
  navigationItems$!: Observable<NavigationItem[] | null>;

  constructor(private store: Store<TrackMolaState>) {
    this.userPhoto$ = this.store.select(getUserPhoto);
    this.navigationItems$ = this.store.select(getNavigationElems);
  }
}

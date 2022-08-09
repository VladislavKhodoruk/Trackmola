import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { Route } from '@shared/enums/enum';
import { NavigationItem } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() photo!: string | null;
  @Input() navItems!: NavigationItem[] | null;

  readonly routes: typeof Route = Route;

  defaultPhoto = DEFAULT_PHOTO_URL;

  constructor(public router: Router) {}
}

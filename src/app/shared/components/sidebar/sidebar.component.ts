import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_PHOTO_URL } from '@shared/constants/constants';
import { NavigationItem } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() photo!: string | null;
  @Input() navItems!: NavigationItem[] | null;

  defaultPhoto = DEFAULT_PHOTO_URL;

  constructor(public router: Router) {}
}

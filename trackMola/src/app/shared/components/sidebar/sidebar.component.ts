import { Component, Input } from '@angular/core';
import { NavigationItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() photo!: string | null;
  @Input() navItems!: NavigationItem[] | null;

  defaultPhoto = 'assets/img/user.png';
}

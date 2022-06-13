import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavigationItem } from '../../interfaces/interfaces';
import { navigationItems } from '../../variables/variables';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() photo!: string | null;
  @Output() logoutEmmiter = new EventEmitter();

  faRightFromBracket = faRightFromBracket;
  navigationItems: NavigationItem[];

  constructor() {
    this.navigationItems = navigationItems;
  }

  logout(event: Event) {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}

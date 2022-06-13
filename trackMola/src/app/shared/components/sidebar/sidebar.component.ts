import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { NavigationItem } from '../../interfaces/interfaces';
import { navigationItems } from '../../variables/variables';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() photo!: string | undefined | null;
  @Output() logoutEmmiter = new EventEmitter();

  faRightFromBracket = faRightFromBracket;
  navigationItems: NavigationItem[];

  constructor(private store: Store<TrackMolaState>) {
    this.navigationItems = navigationItems;
  }

  logout(event: Event) {
    event.preventDefault();
    this.logoutEmmiter.emit();
  }
}

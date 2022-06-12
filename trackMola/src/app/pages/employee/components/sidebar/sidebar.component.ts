import { Component, Input } from '@angular/core';
import {
  faCalendarDays,
  faDiagramProject,
  faPieChart,
  faRightFromBracket,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/pages/authrorization/store/authrorization.actions';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() photo!: string | undefined | null;
  faRightFromBracket = faRightFromBracket;
  navigationItems = [
    {
      routeLink: 'dashboard',
      icon: faTableColumns,
      label: 'Dashboard',
    },
    {
      routeLink: 'report',
      icon: faCalendarDays,
      label: 'My report',
    },
    {
      routeLink: 'projects',
      icon: faDiagramProject,
      label: 'Projects',
    },
    {
      routeLink: 'activity',
      icon: faPieChart,
      label: 'My activity',
    },
  ];
  constructor(private store: Store<TrackMolaState>) {}

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }
}

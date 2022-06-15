import { Component } from '@angular/core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/pages/authrorization/store/authrorization.actions';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent {
  faRightFromBracket = faRightFromBracket;

  constructor(private store: Store<TrackMolaState>) {}

  onLogout() {
    this.store.dispatch(logout());
  }
}

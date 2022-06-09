import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/authrorization/store/authrorization.actions';
import { TrackMolaState } from 'src/app/store/trackMola.state';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrls: ['./employee-layout.component.scss'],
})
export class EmployeeLayoutComponent {
  constructor(private store: Store<TrackMolaState>) {}

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }
}

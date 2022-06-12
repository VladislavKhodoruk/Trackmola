import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackMolaState } from 'src/app/store/trackMola.state';
import { getUserData } from '../../store/employee.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private store: Store<TrackMolaState>) {
    this.store.dispatch(getUserData());
  }
}

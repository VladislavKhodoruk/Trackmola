import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProjects } from '@pages/projects/store/projects.actions';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-employee-projects',
  templateUrl: './employee-projects.component.html',
  styleUrls: ['./employee-projects.component.scss'],
})
export class EmployeeProjectsComponent {
  constructor(private store$: Store<TrackMolaState>) {
    this.store$.dispatch(getProjects());
  }
}

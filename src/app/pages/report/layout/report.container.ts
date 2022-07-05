import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { TrackMolaState } from '@store/trackMola.state';
import { getAllProjects, getAllTasks } from '../store/report.actions';

@Component({
  selector: 'app-report-container',
  template: '<app-report [userType]="this.userType"></app-report>',
})
export class ReportContainer implements OnInit {
  readonly userType: string = localStorage.getItem('AuthUserType');
  constructor(private store$: Store<TrackMolaState>) {}
  ngOnInit(): void {
    this.store$.dispatch(getAllTasks());
    this.store$.dispatch(getAllProjects());
  }
}

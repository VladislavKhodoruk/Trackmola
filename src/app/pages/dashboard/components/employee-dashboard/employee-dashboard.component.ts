import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getWeekReportTime } from '@pages/dashboard/store/dashboard.actions';
import { DashboardState } from '@pages/dashboard/store/dashboard.state';
import {
  collection,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  firestore: Firestore;

  constructor(private dashboardStore$: Store<DashboardState>) {
    this.firestore = getFirestore();
  }

  ngOnInit() {
    const ref = collection(this.firestore, 'taskTrack');

    onSnapshot(query(ref), () =>
      this.dashboardStore$.dispatch(getWeekReportTime())
    );
  }
}

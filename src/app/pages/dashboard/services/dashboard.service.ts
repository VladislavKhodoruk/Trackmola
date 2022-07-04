import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  collection,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { getWeekReportTime } from '../store/dashboard.actions';
import { DashboardState } from '../store/dashboard.state';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  firestore: Firestore;

  constructor(private dashboardStore$: Store<DashboardState>) {
    this.firestore = getFirestore();
  }

  subscibeFirebaseChanges() {
    const ref = collection(this.firestore, 'taskTrack');

    onSnapshot(query(ref), () =>
      this.dashboardStore$.dispatch(getWeekReportTime())
    );
  }
}

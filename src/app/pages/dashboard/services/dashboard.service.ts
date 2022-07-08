import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  collection,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
  Unsubscribe,
} from 'firebase/firestore';
import { getWeekReportTime } from '../store/dashboard.actions';
import { DashboardState } from '../store/dashboard.state';

@Injectable({
  providedIn: 'root',
})
export class DashboardService implements OnDestroy {
  firestore: Firestore;
  unsubscribe: Unsubscribe;

  constructor(private dashboardStore$: Store<DashboardState>) {
    this.firestore = getFirestore();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  subscribeFirebaseChanges() {
    const ref = collection(this.firestore, 'taskTrack');

    this.unsubscribe = onSnapshot(
      query(ref),
      () => {
        console.log('subscibeFirebaseChanges in dashboard service');

        this.dashboardStore$.dispatch(getWeekReportTime());
      },
      (error) => {
        console.log('error :>> ', error);
      }
    );
  }
}

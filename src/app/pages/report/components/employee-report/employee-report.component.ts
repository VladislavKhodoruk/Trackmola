import { Component, OnDestroy, OnInit } from '@angular/core';
import check from '@iconify/icons-tabler/check';
import { Store } from '@ngrx/store';
import { getAllTasksTrack } from '@store/common/common.actions';
import { CommonState } from '@store/common/common.state';
import {
  collection,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
  Unsubscribe,
} from 'firebase/firestore';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss'],
})
export class EmployeeReportComponent implements OnInit, OnDestroy {
  iconCheck = check;
  firestore: Firestore;
  unsubscribe: Unsubscribe;

  constructor(private commonStore$: Store<CommonState>) {
    this.firestore = getFirestore();
  }

  submitReport(event: Event) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  ngOnInit(): void {
    const ref = collection(this.firestore, 'taskTrack');

    this.unsubscribe = onSnapshot(query(ref), () =>
      this.commonStore$.dispatch(getAllTasksTrack())
    );
  }
}

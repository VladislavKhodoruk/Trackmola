import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { TaskTrack } from '@store/shared/shared.state';
import {
  collection,
  Firestore,
  getFirestore,
  query,
  doc,
  setDoc,
  where,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from '@pages/report/interfaces/interfaces';
import {
  NUMBER_OF_DAYS_IN_A_WEEK,
  ONE_DAY_IN_SECONDS,
} from '@shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  firestore: Firestore;
  allTasks!: TaskTrack[];

  public get allTasks$(): Observable<Task[]> {
    const ref = collection(this.firestore, 'tasks');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<Task[]>;
  }
  constructor() {
    this.firestore = getFirestore();
  }

  getTasksTrack(): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const queryAllTasks = query(
      ref,
      where('userId', '==', localStorage.getItem('AuthUserId'))
    );

    return collectionData(queryAllTasks) as Observable<TaskTrack[]>;
  }

  setTaskTrack(taskTrack: TaskTrack): void {
    const refTaskTrack = doc(collection(this.firestore, 'taskTrack'));
    taskTrack.id = refTaskTrack.id;

    setDoc(refTaskTrack, taskTrack);
  }

  get getWeekTasks$(): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const firstDayOfWeek = new Date(
      now.getTime() - ONE_DAY_IN_SECONDS * (now.getDay() - 1)
    );

    const lastDayOfWeek = new Date(
      now.getTime() +
        ONE_DAY_IN_SECONDS * (NUMBER_OF_DAYS_IN_A_WEEK - now.getDay())
    );

    const userId = localStorage.getItem('AuthUserId');

    const queryWeekTasks = query(
      ref,
      where('date', '>', firstDayOfWeek),
      where('date', '<', lastDayOfWeek),
      where('userId', '==', userId)
    );

    return collectionData(queryWeekTasks) as Observable<TaskTrack[]>;
  }
}

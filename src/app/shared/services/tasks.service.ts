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
import { getPeriod } from '@shared/helpers/helpers';
import { Period } from '@shared/interfaces/interfaces';

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
    const period: Period = getPeriod(now, 'week');

    const queryWeekTasks = query(
      ref,
      where('date', '>', new Date(period.start)),
      where('date', '<', new Date(period.end)),
      where('userId', '==', localStorage.getItem('AuthUserId'))
    );

    return collectionData(queryWeekTasks) as Observable<TaskTrack[]>;
  }
}

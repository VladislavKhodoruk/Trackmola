import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import {
  collection,
  Firestore,
  getFirestore,
  query,
  doc,
  setDoc,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from '@pages/report/interfaces/interfaces';
import { Period, TaskTrack } from '@shared/interfaces/interfaces';
import { getPeriod } from '@shared/helpers/helpers';

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

    const userId = localStorage.getItem('AuthUserId');
    const queryWeekTasks = query(
      ref,
      where('date', '>', new Date(period.start)),
      where('date', '<', new Date(period.end)),
      where('userId', '==', userId)
    );

    return collectionData(queryWeekTasks) as Observable<TaskTrack[]>;
  }

  removeTask(id: string): void {
    deleteDoc(doc(this.firestore, 'taskTrack', id));
  }

  updateTask(id: string, tasktrack: TaskTrack): void {
    tasktrack.id = id;
    setDoc(doc(this.firestore, 'taskTrack', id), tasktrack);
  }
}

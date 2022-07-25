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
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { Observable, of } from 'rxjs';

import { PeriodType } from '@shared/enums/enum';
import { getPeriod } from '@shared/helpers/helpers';
import { Period, TaskTrack, Task } from '@shared/interfaces/interfaces';

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

  setTaskTrack(taskTrack: TaskTrack): Observable<any> {
    const refTaskTrack = doc(collection(this.firestore, 'taskTrack'));
    const newTaskTrack = {
      ...taskTrack,
      id: refTaskTrack.id,
    };
    setDoc(refTaskTrack, newTaskTrack);
    return of();
  }

  get getWeekTasks$(): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');

    const now = new Date();
    const period: Period = getPeriod(now, PeriodType.Week);

    const userId = localStorage.getItem('AuthUserId');
    const queryWeekTasks = query(
      ref,
      where('date', '>', new Date(period.start)),
      where('date', '<', new Date(period.end)),
      where('userId', '==', userId)
    );

    return collectionData(queryWeekTasks) as Observable<TaskTrack[]>;
  }

  removeTask(id: string): Observable<any> {
    deleteDoc(doc(this.firestore, 'taskTrack', id));
    return of();
  }

  updateTask(tasktrack: TaskTrack): Observable<any> {
    setDoc(doc(this.firestore, 'taskTrack', tasktrack.id), tasktrack);
    return of();
  }

  setTask(task: Task): Observable<any> {
    const refTask = doc(collection(this.firestore, 'tasks'));
    const newTask = {
      ...task,
      id: refTask.id,
    };
    setDoc(refTask, newTask);

    const refProject = doc(this.firestore, 'projects', task.projectId);
    updateDoc(refProject, {
      taskId: arrayUnion(newTask.id),
    });
    return of();
  }
}

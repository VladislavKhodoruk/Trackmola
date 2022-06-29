import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { SharedState, TaskTrack } from '@store/shared/shared.state';
import {
  collection,
  Firestore,
  getFirestore,
  query,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Task } from '@pages/report/interfaces/interfaces';
import { Action, Store } from '@ngrx/store';
import { getAllTasks } from '../../store/shared/shared.actions';

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
  constructor(private sharedStore$: Store<SharedState>) {
    this.firestore = getFirestore();
  }

  getTasks(): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const queryAllTasks = query(ref);

    return collectionData(queryAllTasks) as Observable<TaskTrack[]>;
  }

  setTaskTrack(taskTrack: TaskTrack): void {
    const id = doc(collection(this.firestore, 'taskTrack'));
    taskTrack.id = id.id;

    void setDoc(id, taskTrack);

    this.updateFirebaseData('taskTrack', getAllTasks());
  }

  updateFirebaseData(collectionName: string, func: Action) {
    const ref = collection(this.firestore, collectionName);
    const queryAllTasks = query(ref);

    onSnapshot(
      queryAllTasks,
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((respons) => {
          tasks.push(respons.data());
        });

        this.sharedStore$.dispatch(func);
      }
    );
  }
}

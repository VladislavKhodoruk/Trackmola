import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { TaskTrack } from '@store/shared/shared.state';
import {
  collection,
  Firestore,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Tasks } from '@shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  firestore: Firestore;
  allTasks!: TaskTrack[];
  constructor() {
    this.firestore = getFirestore();
  }

  getTasks(): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const queryAllTasks = query(ref);
    return collectionData(queryAllTasks) as Observable<TaskTrack[]>;
  }

  public getCurrentTaskById(id): Observable<Tasks> {
    const ref = collection(this.firestore, 'tasks');
    const queryAll = query(ref, where('id', '==', id));
    return collectionData(queryAll) as unknown as Observable<Tasks>;
  }
}

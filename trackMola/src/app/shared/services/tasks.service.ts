import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { collection, Firestore, getFirestore, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { TaskTrack } from 'src/app/store/shared/shared.state';

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
}

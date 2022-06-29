import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Project, Task } from '@pages/projects/interfaces/interfaces';
import { FirstAndLastDay } from '@shared/interfaces/interfaces';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private firestore: Firestore) {}

  public getTasks$(firstAndLastDay?: FirstAndLastDay): Observable<Task[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const firstDay = new Date(firstAndLastDay.start);
    const lastDay = new Date(firstAndLastDay.end);
    const queryAll = query(
      ref,
      where('userId', '==', localStorage.AuthUserId),
      where('date', '>', firstDay),
      where('date', '<', lastDay)
    );
    return collectionData(queryAll) as Observable<Task[]>;
  }

  public getProjectsInTasks$(tasks: Task[]): Observable<Project[]> {
    const projects = tasks.map((item) => item.projectId);
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(ref, where('id', 'in', projects));
    return collectionData(queryAll) as Observable<Project[]>;
  }
}

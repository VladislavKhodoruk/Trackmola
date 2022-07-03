import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Period, Project, Task } from '@shared/interfaces/interfaces';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private firestore: Firestore) {}

  public getTasks$(period?: Period): Observable<Task[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const firstDay: Date = new Date(period.start);
    const lastDay: Date = new Date(period.end);
    const queryAll = query(
      ref,
      where('userId', '==', localStorage.AuthUserId),
      where('date', '>', firstDay),
      where('date', '<', lastDay)
    );
    return collectionData(queryAll) as Observable<Task[]>;
  }

  public getProjectsInTasks$(tasks: Task[]): Observable<Project[]> {
    const projects: Project['id'][] = tasks.map((item) => item.projectId);
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(ref, where('id', 'in', projects));
    return collectionData(queryAll) as Observable<Project[]>;
  }
}

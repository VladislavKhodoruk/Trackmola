import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Period, Project, TaskTrack } from '@shared/interfaces/interfaces';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private firestore: Firestore) {}

  public getTasks$(period: Period): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const firstDay: Date = new Date(period.start);
    const lastDay: Date = new Date(period.end);
    const queryAll = query(
      ref,
      where('userId', '==', localStorage.getItem('AuthUserId')),
      where('date', '>', firstDay),
      where('date', '<', lastDay)
    );
    return collectionData(queryAll) as Observable<TaskTrack[]>;
  }

  public getProjectsInTasks$(tasks: TaskTrack[]): Observable<Project[]> {
    const projects: Project['id'][] = tasks.map(({ projectId }) => projectId);
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(ref, where('id', 'in', projects));
    return collectionData(queryAll) as Observable<Project[]>;
  }
}

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
export class ProjectsPageService {
  constructor(private firestore: Firestore) {}

  public getAllTasks$(period: Period): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const firstDay = new Date(period.start);
    const lastDay = new Date(period.end);
    const queryAll = query(
      ref,
      where('date', '>', firstDay),
      where('date', '<', lastDay)
    );
    return collectionData(queryAll) as Observable<TaskTrack[]>;
  }

  public get allProjects$(): Observable<Project[]> {
    const ref = collection(this.firestore, 'projects');
    return collectionData(ref) as Observable<Project[]>;
  }
}

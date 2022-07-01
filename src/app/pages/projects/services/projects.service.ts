import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Project, TaskTrack } from '@pages/projects/interfaces/interfaces';
import { TaskStatus } from '@shared/enums/enum';
import { FirstAndLastDay } from '@shared/interfaces/interfaces';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private firestore: Firestore) {}

  public getTasks$(firstAndLastDay?: FirstAndLastDay): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const firstDay = new Date(firstAndLastDay.start);
    const lastDay = new Date(firstAndLastDay.end);
    const queryAll = query(
      ref,
      where('userId', '==', localStorage.AuthUserId),
      where('date', '>', firstDay),
      where('date', '<', lastDay)
    );
    return collectionData(queryAll) as Observable<TaskTrack[]>;
  }

  public getProjects$(projectsId: Project['id'][]): Observable<Project[]> {
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(ref, where('id', 'in', projectsId));
    return collectionData(queryAll) as Observable<Project[]>;
  }

  public getActiveTasksInProjects$(
    projectId: Project['id'],
    firstAndLastDay?: FirstAndLastDay
  ): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const firstDay = new Date(firstAndLastDay.start);
    const lastDay = new Date(firstAndLastDay.end);
    const queryAll = query(
      ref,
      where('projectId', '==', projectId),
      where('status', '==', TaskStatus.InProgress),
      where('date', '>', firstDay),
      where('date', '<', lastDay)
    );
    return collectionData(queryAll) as Observable<TaskTrack[]>;
  }
}

import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Project, TaskTrack } from '@pages/projects/interfaces/interfaces';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public get tasks$(): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const queryAll = query(ref, where('userId', '==', localStorage.AuthUserId));
    return collectionData(queryAll) as Observable<TaskTrack[]>;
  }

  constructor(private firestore: Firestore) {}

  public getProjects$(projectsId: string[]): Observable<Project[]> {
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(ref, where('id', 'in', projectsId));
    return collectionData(queryAll) as Observable<Project[]>;
  }
}

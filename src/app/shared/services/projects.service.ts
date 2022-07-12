import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Project } from '@shared/interfaces/interfaces';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public get allProjects$(): Observable<Project[]> {
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(ref);

    return collectionData(queryAll) as Observable<Project[]>;
  }

  constructor(private firestore: Firestore) {}

  public tasksInProject$(project): Observable<Task[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const queryAll = query(ref, where('projectId', '==', project));
    return collectionData(queryAll) as Observable<Task[]>;
  }

  getAllProjects$(): Observable<Project[]> {
    const projects = collection(this.firestore, 'projects');
    return collectionData(projects) as Observable<Project[]>;
  }
}

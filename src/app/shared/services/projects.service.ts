import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { Project } from '@shared/interfaces/interfaces';

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
}

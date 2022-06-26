import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { where } from 'firebase/firestore';
import {
  Project,
  Task,
  UserProfileInProject,
} from '@pages/projects/interfaces/interfaces';
import { ProfileUser } from '@shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  get projects$(): Observable<Project[]> {
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(
      ref,
      where('team', 'array-contains', localStorage.AuthUserId)
    );
    return collectionData(queryAll) as Observable<Project[]>;
  }

  constructor(private firestore: Firestore) {}

  tasksInProject$(project): Observable<Task[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const queryAll = query(ref, where('projectId', '==', project));
    return collectionData(queryAll) as Observable<Task[]>;
  }

  usersInProject$(team): Observable<UserProfileInProject[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref, where('id', 'in', team));
    return collectionData(queryAll) as Observable<UserProfileInProject[]>;
  }
}

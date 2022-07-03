import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import {
  Project,
  Task,
  UserProfileInProject,
} from '@pages/projects/interfaces/interfaces';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public get projects$(): Observable<Project[]> {
    const ref = collection(this.firestore, 'projects');
    const queryAll = query(
      ref,
      where('team', 'array-contains', localStorage.AuthUserId)
    );
    return collectionData(queryAll) as Observable<Project[]>;
  }

  constructor(private firestore: Firestore) {}

  public tasksInProject$(project): Observable<Task[]> {
    const ref = collection(this.firestore, 'taskTrack');
    const queryAll = query(ref, where('projectId', '==', project));
    return collectionData(queryAll) as Observable<Task[]>;
  }

  public usersInProject$(team): Observable<UserProfileInProject[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref, where('id', 'in', team));
    return collectionData(queryAll) as Observable<UserProfileInProject[]>;
  }

  getAllProjects$(): Observable<Project[]> {
    const projects = collection(this.firestore, 'projects');
    return collectionData(projects) as Observable<Project[]>;
  }
}

import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Project, Task, TaskTrack } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsPageService {
  constructor(private firestore: Firestore) {}

  public get taskTracks$(): Observable<TaskTrack[]> {
    const ref = collection(this.firestore, 'taskTrack');
    return collectionData(ref) as Observable<TaskTrack[]>;
  }

  public get tasks$(): Observable<Task[]> {
    const ref = collection(this.firestore, 'tasks');
    return collectionData(ref) as Observable<Task[]>;
  }

  public get projects$(): Observable<Project[]> {
    const ref = collection(this.firestore, 'projects');
    return collectionData(ref) as Observable<Project[]>;
  }
}

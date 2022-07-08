import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getAllProjectsSuccess,
  getAllTasksSuccess,
  getAllTaskTracksSuccess,
  getAllUsers,
} from '@store/common/common.actions';
import { TrackMolaState } from '@store/trackMola.state';
import {
  collection,
  Firestore,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  firestore: Firestore;

  constructor(private store$: Store<TrackMolaState>) {
    this.firestore = getFirestore();
  }

  subscribeFirebaseChanges() {
    const refTaskTrack = collection(this.firestore, 'taskTrack');
    const refTasks = collection(this.firestore, 'tasks');
    const refProjects = collection(this.firestore, 'projects');

    onSnapshot(
      query(refTaskTrack),
      (respons) => {
        const taskTracks = [];
        respons.forEach((item) => {
          taskTracks.push(item.data());
        });
        this.store$.dispatch(getAllTaskTracksSuccess({ taskTracks }));
      },
      (error) => {
        console.log('error :>> ', error);
      }
    );

    onSnapshot(
      query(refTasks),
      (respons) => {
        const tasks = [];
        respons.forEach((item) => {
          tasks.push(item.data());
        });
        this.store$.dispatch(getAllTasksSuccess({ tasks }));
      },
      (error) => {
        console.log('error :>> ', error);
      }
    );

    onSnapshot(
      query(refProjects),
      (respons) => {
        const projects = [];
        respons.forEach((item) => {
          projects.push(item.data());
        });
        this.store$.dispatch(getAllProjectsSuccess({ projects }));
      },
      (error) => {
        console.log('error :>> ', error);
      }
    );

    this.store$.dispatch(getAllUsers());
  }
}
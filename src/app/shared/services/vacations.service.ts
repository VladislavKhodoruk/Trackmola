import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Vacation } from '@shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class VacationsService {
  public get allVacations$(): Observable<Vacation[]> {
    const ref = collection(this.firestore, 'vacations');
    const queryAll = query(ref);

    return collectionData(queryAll) as Observable<Vacation[]>;
  }

  constructor(private firestore: Firestore) {}
}

import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  updateDoc,
} from '@angular/fire/firestore';

import { Action } from '@ngrx/store';
import { User as UserFirebase } from 'firebase/auth';

import { setDoc } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';

import { AuthorizationService } from '@pages/authorization/services/authorization.service';
import { User } from '@shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public get currentUserProfile$(): Observable<User | null> {
    const ref = doc(
      this.firestore,
      'users',
      localStorage.getItem('AuthUserId')
    );

    return docData(ref) as Observable<User>;
  }

  public get allUsers$(): Observable<User[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);

    return collectionData(queryAll) as Observable<User[]>;
  }

  constructor(
    private firestore: Firestore,
    private authorizationService: AuthorizationService
  ) {}

  public updateUser(user: User): Observable<void | null> {
    return this.authorizationService.currentUser$.pipe(
      switchMap((data: UserFirebase | null) => {
        if (!data?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', data.uid);

        return from(updateDoc(ref, { ...user }));
      })
    );
  }

  public get users$(): Observable<User[]> {
    const ref = collection(this.firestore, 'users');

    return collectionData(ref) as Observable<User[]>;
  }

  public editUser(user: User): Observable<any> {
    setDoc(doc(this.firestore, 'users', user.id), user);
    return of();
  }
}

import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { AuthorizationService } from '@pages/authorization/services/authorization.service';
import { ProfileUser } from '@shared/interfaces/interfaces';
import { User as UserFirebase } from 'firebase/auth';
import { User } from '@pages/projects/interfaces/interfaces';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public get currentUserProfile$(): Observable<ProfileUser | null> {
    const ref = doc(
      this.firestore,
      'users',
      localStorage.getItem('AuthUserId')
    );
    return docData(ref) as Observable<ProfileUser>;
  }

  public get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }

  constructor(
    private firestore: Firestore,
    private authorizationService: AuthorizationService
  ) {}

  public updateUser(user: ProfileUser): Observable<void | null> {
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
}

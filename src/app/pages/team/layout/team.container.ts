import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@shared/interfaces/interfaces';

import { Observable } from 'rxjs';
import { getUser } from '../store/team.selectors';
import { TeamState } from '../store/team.state';

@Component({
  selector: 'app-team-container',
  template: `<app-team
    [userType]="userType"
    [user]="pickedUser$ | async"
  ></app-team>`,
})
export class TeamContainer {
  readonly userType: string = localStorage.getItem('AuthUserType');

  readonly pickedUser$: Observable<User> = this.teamStore$.select(getUser);

  constructor(private teamStore$: Store<TeamState>) {}
}

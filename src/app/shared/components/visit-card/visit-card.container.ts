import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { updateUser } from '@pages/team/store/team.actions';
import { TeamState } from '@pages/team/store/team.state';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-visit-card-container',
  template: `<app-visit-card-component
    [user]="user"
    [adminMode]="adminMode"
    (setRole)="setRole($event)"
  ></app-visit-card-component>`,
})
export class VisitCardContainer {
  @Input() user!: User;
  @Input() adminMode = false;

  constructor(private teamStore$: Store<TeamState>) {}

  protected setRole(newUser: User): void {
    this.teamStore$.dispatch(updateUser({ user: newUser }));
  }
}

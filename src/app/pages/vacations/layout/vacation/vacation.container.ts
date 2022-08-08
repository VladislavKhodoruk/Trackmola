import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '@shared/interfaces/interfaces';

import { getUsers } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vacation-container',
  template: '<app-vacation [users]="users$ | async"></app-vacation>',
})
export class VacationContainer {
  readonly users$: Observable<User[]> = this.store$.select(getUsers);

  constructor(private store$: Store<TrackMolaState>) {}
}

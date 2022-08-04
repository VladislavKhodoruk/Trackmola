import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { changeDashboardView } from '@pages/dashboard/store/dashboard.actions';
import { getDashboardView } from '@pages/dashboard/store/dashboard.selectors';
import { UserType } from '@shared/enums/enum';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header-container',
  template: `<app-header
    [dashboardView]="dashboardView$ | async"
    (changeViewMode)="onChangeViewMode($event)"
  ></app-header>`,
})
export class HeaderContainer {
  readonly dashboardView$: Observable<UserType> =
    this.store$.select(getDashboardView);

  constructor(private store$: Store<TrackMolaState>) {}

  protected onChangeViewMode(dashboardView: UserType): void {
    this.store$.dispatch(changeDashboardView({ dashboardView }));
  }
}

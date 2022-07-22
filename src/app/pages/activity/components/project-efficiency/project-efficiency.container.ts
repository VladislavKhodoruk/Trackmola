import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { getMyActivityTaskTracks } from '@pages/activity/store/activity.selectors';
import { TaskTrack } from '@shared/interfaces/interfaces';
import { getDate, getFirstDay } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-project-efficiency-container',
  template: `<app-project-efficiency-component
    [tasks]="activeTasks$ | async"
    [startOfWeek]="startOfWeek$ | async"
    [presentDay]="presentDay$ | async"
  ></app-project-efficiency-component>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEfficiencyContainer {
  readonly activeTasks$: Observable<TaskTrack[]> = this.store$.select(
    getMyActivityTaskTracks
  );

  readonly startOfWeek$: Observable<number> = this.store$.select(getFirstDay);

  readonly presentDay$: Observable<number> = this.store$.select(getDate);
  constructor(private store$: Store<TrackMolaState>) {}
}

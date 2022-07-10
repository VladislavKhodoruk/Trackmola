import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProjects } from '@store/common/common.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-manager-report-constructor-container',
  template: `<app-manager-report-constructor
    [projects]="projects$ | async"
  ></app-manager-report-constructor>`,
})
export class ManagerReportConstructorContainer {
  @Input() userType: string;
  projects$ = this.store$.select(getProjects);

  constructor(private store$: Store<TrackMolaState>) {}
}

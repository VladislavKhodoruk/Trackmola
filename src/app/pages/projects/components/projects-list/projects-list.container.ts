import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getMyProgects } from '@pages/projects/store/projects.selectors';
import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-list-container',
  template: `<app-projects-list
    [myProjects]="this.myProjects$ | async"
  ></app-projects-list>`,
})
export class ProjectsListContainer {
  myProjects$ = this.store$.select(getMyProgects);

  constructor(private store$: Store<TrackMolaState>) {}
}

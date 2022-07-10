import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProjectByRoute } from '@pages/projects/store/projects.selectors';
import { Project } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-projects-container',
  template: `<app-employee-projects
    [projectByRoute]="projectByRoute$ | async"
  ></app-employee-projects>`,
})
export class EmployeeProjectsContainer {
  readonly projectByRoute$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  constructor(private store$: Store<TrackMolaState>) { }


}

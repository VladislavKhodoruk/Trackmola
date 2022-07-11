import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProjectByRoute } from '@pages/projects/store/projects.selectors';
import { Project } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-container',
  template: `<app-projects
    class="projects"
    [projectByRoute]="projectByRoute$ | async"
  ></app-projects>`,
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsContainer {
  readonly projectByRoute$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  constructor(private store$: Store<TrackMolaState>) {}
}

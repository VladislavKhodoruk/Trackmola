import { TrackMolaState } from './../../../../store/trackMola.state';
import { Store } from '@ngrx/store';
import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  getActiveTasksInProject,
  getProjectByRoute,
} from '@pages/projects/store/projects.selectors';
import { Project, Task } from '@shared/interfaces/interfaces';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-active-tasks-container',
  template: `<app-active-tasks
    [project]="project$ | async"
    [activeTasksInProject]="activeTasksInProject$ | async"
  ></app-active-tasks>`,
  styleUrls: ['./active-tasks.component.scss'],
})
export class ActiveTasksContainer implements OnInit, OnDestroy {
  readonly project$: Observable<Project> =
    this.store$.select(getProjectByRoute);

  projectSubscription: Subscription;

  activeTasksInProject$: Observable<Task[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {
    this.projectSubscription = this.project$.subscribe((project) => {
      if (project) {
        this.activeTasksInProject$ = this.store$.select(
          getActiveTasksInProject(project)
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
}

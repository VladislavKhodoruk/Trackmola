import { Observable } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project, TaskTrack } from '@pages/projects/interfaces/interfaces';
import {
  deleteProject,
  getActiveTasksInProject,
} from '@pages/projects/store/projects.actions';

import { TrackMolaState } from '@store/trackMola.state';
import { getActiveTasksInProjects } from '@pages/projects/store/projects.selectors';
import { getFirstAndLastDay } from '@shared/helpers/helpers';

@Component({
  selector: 'app-project-item-container',
  template: `<app-project-item
    class="projects-list-item"
    [(project)]="project"
    [tasksInProject]="tasksInProject$ | async"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemContainer implements OnInit, OnDestroy {
  @Input() project!: Project;
  tasksInProject$: Observable<TaskTrack[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {
    this.store$.dispatch(
      getActiveTasksInProject({
        projectId: this.project.id,
        period: getFirstAndLastDay(new Date(), 'week'),
      })
    );
    this.tasksInProject$ = this.store$.select(
      getActiveTasksInProjects({ projectId: this.project.id })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(deleteProject({ id: this.project.id }));
  }
}

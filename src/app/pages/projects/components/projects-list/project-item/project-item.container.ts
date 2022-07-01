import { Observable } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project, TaskTrack } from '@pages/projects/interfaces/interfaces';
import {
  deleteProject,
  getActiveTasksInProject,
  getUsersPhotoInProject,
} from '@pages/projects/store/projects.actions';

import { TrackMolaState } from '@store/trackMola.state';
import { getActiveTasksInProjects } from '@pages/projects/store/projects.selectors';
import { getFirstAndLastDay } from '@shared/helpers/helpers';

@Component({
  selector: 'app-project-item-container',
  template: `<app-project-item
    class="projects-list-item"
    [(project)]="project"
    [activeTasksInProjects]="activeTasksInProjects$ | async"
    (getActiveTasksInProject)="getActiveTasksInProject($event)"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemContainer implements OnInit, OnDestroy {
  @Input() project!: Project;
  readonly activeTasksInProjects$ = this.store$.select(
    getActiveTasksInProjects
  );

  photoUsersInProject$: Observable<TaskTrack['userId'][]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {}

  getActiveTasksInProject(data) {
    this.store$.dispatch(
      getActiveTasksInProject({
        projectId: data.projectId,
        period: data.period,
      })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(deleteProject({ id: this.project.id }));
  }
}

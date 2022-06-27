import { Observable } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project, Task } from '@pages/projects/interfaces/interfaces';
import {
  deleteProject,
  getTasksInProject,
  getUsersProfileInProject,
} from '@pages/projects/store/projects.actions';
import {
  getAllTasksInProject,
  getUsersPhotoInProject,
} from '@pages/projects/store/projects.selectors';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-project-item-container',
  template: `<app-project-item
    class="projects-list-item"
    [(project)]="project"
    [tasksInProject]="tasksInProject$ | async"
    [usersPhotoInProject]="usersPhotoInProject$ | async"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemContainer implements OnInit, OnDestroy {
  @Input() project!: Project;

  tasksInProject$: Observable<Task[]>;
  usersPhotoInProject$: Observable<string[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {
    this.store$.dispatch(getTasksInProject({ id: this.project.id }));
    this.store$.dispatch(
      getUsersProfileInProject({ id: this.project.id, team: this.project.team })
    );
    this.tasksInProject$ = this.store$.select(
      getAllTasksInProject({ project: this.project.id })
    );
    this.usersPhotoInProject$ = this.store$.select(
      getUsersPhotoInProject({ project: this.project.id })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(deleteProject({ id: this.project.id }));
  }
}

import { Observable } from 'rxjs';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

import { TrackMolaState } from '@store/trackMola.state';
import {
  getActiveTasksInProjects,
  getUsersInProjects,
} from '@pages/projects/store/projects.selectors';

@Component({
  selector: 'app-project-item-container',
  template: `<app-project-item
    class="projects-list-item"
    [(project)]="project"
    [activeTasksInProject]="activeTasksInProject$ | async"
    [usersInProject]="usersInProject$ | async"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemContainer implements OnChanges {
  @Input() project!: Project;

  activeTasksInProject$: Observable<TaskTrack[]>;
  usersInProject$: Observable<User[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && this.project) {
      this.usersInProject$ = this.store$.select(
        getUsersInProjects({ projectId: this.project.id })
      );
      this.activeTasksInProject$ = this.store$.select(
        getActiveTasksInProjects({ projectId: this.project.id })
      );
    }
  }
}

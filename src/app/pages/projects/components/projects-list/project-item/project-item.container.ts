import { Observable } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Project,
  TaskTrack,
  User,
} from '@pages/projects/interfaces/interfaces';
import {
  deleteProject,
  getActiveTasksInProject,
} from '@pages/projects/store/projects.actions';

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
    (getActiveTasksInProject)="getActiveTasksInProject($event)"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemContainer implements OnChanges, OnInit, OnDestroy {
  @Input() project!: Project;

  activeTasksInProject$: Observable<TaskTrack[]>;
  usersInProject$: Observable<User[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && this.project) {
      this.activeTasksInProject$ = this.store$.select(
        getActiveTasksInProjects({ projectId: this.project.id })
      );
      this.usersInProject$ = this.store$.select(
        getUsersInProjects({ projectId: this.project.id })
      );
    }
  }

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

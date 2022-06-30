import { Observable } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project, Task } from '@pages/projects/interfaces/interfaces';
import { deleteProject } from '@pages/projects/store/projects.actions';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-project-item-container',
  template: `<app-project-item
    class="projects-list-item"
    [(project)]="project"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemContainer implements OnInit, OnDestroy {
  @Input() project!: Project;

  tasksInProject$: Observable<Task[]>;
  usersPhotoInProject$: Observable<string[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store$.dispatch(deleteProject({ id: this.project.id }));
  }
}

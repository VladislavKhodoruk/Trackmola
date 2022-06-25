import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project, Task } from '@pages/projects/interfaces/interfaces';
import { getTasksInProject } from '@pages/projects/store/projects.actions';
import { getAllTasksInProject } from '@pages/projects/store/projects.selectors';

import { TrackMolaState } from '@store/trackMola.state';

@Component({
  selector: 'app-projects-item-container',
  template: `<app-project-item
    class="projects-list-item"
    [(project)]="this.project"
    [tasksInProject]="this.tasksInProject$ | async"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectsItemContainer implements OnInit {
  @Input() project!: Project;
  tasksInProject$: Observable<Task[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {
    this.store$.dispatch(getTasksInProject({ id: this.project.id }));
    this.tasksInProject$ = this.store$.select(
      getAllTasksInProject({ project: this.project.id })
    );
  }
}

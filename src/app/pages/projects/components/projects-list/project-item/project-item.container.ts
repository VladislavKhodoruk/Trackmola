import { User } from './../../../../../shared/interfaces/interfaces';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  activeTasksInProject,
  usersInProject,
} from '@pages/projects/store/projects.selectors';
import { Project, TaskTrack } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-item-container',
  template: `<app-project-item
    class="projects-list-item"
    [project]="project"
    [activeTasksInProject]="activeTasksInProject$ | async"
    [usersInProject]="usersInProject$ | async"
  ></app-project-item>`,
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemContainer implements OnChanges {
  @Input() readonly project: Project;
  @Input() readonly index: number;

  activeTasksInProject$: Observable<TaskTrack[]>;
  usersInProject$: Observable<User[]>;

  constructor(
    private store$: Store<TrackMolaState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.index) {
      if (this.index === 0) {
        void this.router.navigate([this.project.name.toLowerCase()], {
          relativeTo: this.route,
        });
      }
    }
    if (changes.project && this.project) {
      this.activeTasksInProject$ = this.store$.select(
        activeTasksInProject(this.project)
      );

      this.usersInProject$ = this.store$.select(usersInProject(this.project));
    }
  }
}

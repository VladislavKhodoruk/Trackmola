import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getProjectByRoute,
  usersInProject,
} from '@pages/projects/store/projects.selectors';
import { Project, User } from '@shared/interfaces/interfaces';
import { TrackMolaState } from '@store/trackMola.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-team-item-container',
  template: `<app-projects-team-item
    [usersInProject]="usersInProject$ | async"
    [projectByRoute]="projectByRoute$ | async"
  ></app-projects-team-item>`,
  styleUrls: ['./projects-team-item.component.scss'],
})
export class ProjectsTeamItemContainer implements OnInit {
  usersInProject$: Observable<User[]>;
  readonly projectByRoute$: Observable<Project> =
    this.store$.select(getProjectByRoute);
  projectSubscription: Subscription;

  constructor(private store$: Store<TrackMolaState>) { }

  ngOnInit(): void {
    this.projectSubscription = this.projectByRoute$.subscribe((project) => {
      if (project) {
        this.usersInProject$ = this.store$.select(usersInProject(project));
      }
    });
  }
}

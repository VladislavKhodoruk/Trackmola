import { Store } from '@ngrx/store';
import { Component, Input, OnInit } from '@angular/core';
import { TrackMolaState } from '@store/trackMola.state';
import { Project, Task, TaskTrack } from '@shared/interfaces/interfaces';
import { getActiveTaskTracksInTask } from '@pages/projects/store/projects.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-active-task-container',
  template: `<app-active-task
    [project]="project"
    [activeTask]="activeTask"
    [activeTaskTracksInTask]="activeTaskTracksInTask$ | async"
  ></app-active-task>`,
  styleUrls: ['./active-task.component.scss'],
})
export class ActiveTaskContainer implements OnInit {
  @Input() readonly project: Project;
  @Input() readonly activeTask: Task;

  activeTaskTracksInTask$: Observable<TaskTrack[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnInit(): void {
    this.activeTaskTracksInTask$ = this.store$.select(
      getActiveTaskTracksInTask(this.activeTask)
    );
  }
}

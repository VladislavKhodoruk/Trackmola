import { Store } from '@ngrx/store';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrackMolaState } from '@store/trackMola.state';
import { Project, Task } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { getActiveTaskTracksInTask } from '@pages/projects/store/projects.selectors';
import { TaskTrackWithUserInfo } from '@pages/projects/interfaces/interface';
@Component({
  selector: 'app-active-task-container',
  template: `<app-active-task
    [project]="project"
    [task]="task"
    [activeTaskTracksInTask]="activeTaskTracksInTask$ | async"
  ></app-active-task>`,
  styleUrls: ['./active-task.component.scss'],
})
export class ActiveTaskContainer implements OnChanges {
  @Input() readonly project: Project;
  @Input() readonly task: Task;

  activeTaskTracksInTask$: Observable<TaskTrackWithUserInfo[]>;

  constructor(private store$: Store<TrackMolaState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task && this.task) {
      this.activeTaskTracksInTask$ = this.store$.select(
        getActiveTaskTracksInTask(this.task)
      );
    }
  }
}

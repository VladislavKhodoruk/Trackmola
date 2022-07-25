import { Component, Input } from '@angular/core';

import { getRandomColor } from '@shared/helpers/helpers';

import { GroupBy, Project, Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-tasks-user-mode',
  styleUrls: ['./active-tasks-user-mode.component.scss'],
  templateUrl: './active-tasks-user-mode.component.html',
})
export class ActiveTasksUserModeComponent {
  @Input() readonly project: Project;
  @Input() readonly activeTaskGroupByProject: GroupBy<Task[]>;
  @Input() readonly activeTaskTracksDurationGroupByTask: GroupBy<number>;
  @Input() readonly tasksInfoByTaskId: GroupBy<Task>;

  getRandomColor(): string {
    return getRandomColor();
  }
}

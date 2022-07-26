import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ActiveTasks } from '@shared/interfaces/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-active-tasks-list',
  styleUrls: ['active-tasks-list.component.scss'],
  templateUrl: 'active-tasks-list.component.html',
})
export class ActiveTasksListComponent {
  @Input() fullTask!: ActiveTasks[];
}

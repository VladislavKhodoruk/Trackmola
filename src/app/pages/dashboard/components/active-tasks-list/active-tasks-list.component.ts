import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ActiveTasks } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-tasks-list',
  templateUrl: 'active-tasks-list.component.html',
  styleUrls: ['active-tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksListComponent {
  @Input() fullTask!: ActiveTasks[];
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-active-tasks-list',
  templateUrl: 'active-tasks-list.component.html',
  styleUrls: ['active-tasks-list.component.scss'],
})
export class ActiveTasksListComponent {
  @Input() allTasks;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project, Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-active-tasks',
  templateUrl: './active-tasks.component.html',
  styleUrls: ['./active-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTasksComponent {
  @Input() readonly project: Project;
  @Input() readonly activeTasksInProject: Task[];
}

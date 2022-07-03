import { Component, Input } from '@angular/core';
import { Project, TaskTrack, User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent {
  @Input() readonly project!: Project;
  @Input() readonly usersInProject!: User[];
  @Input() readonly activeTasksInProject!: TaskTrack[];
}

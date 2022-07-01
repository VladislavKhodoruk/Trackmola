import { Component, Input } from '@angular/core';
import { Project, TaskTrack } from '@pages/projects/interfaces/interfaces';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent {
  @Input() readonly project!: Project;
  @Input() readonly tasksInProject!: TaskTrack[];
}

import { Component, Input } from '@angular/core';
import { Project, User, TaskTrack, Task } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  @Input() readonly projects: Project[];
  @Input() readonly tasks: Task[];
  @Input() readonly users: User[];
  @Input() readonly taskTracks: TaskTrack[];
  @Input() readonly selectedProject!: Project;
  @Input() readonly searchText: string;
}

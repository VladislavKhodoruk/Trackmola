import { Component, Input } from '@angular/core';
import { Project } from '@pages/projects/interfaces/interfaces';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  @Input() myProjects!: Project[];
}

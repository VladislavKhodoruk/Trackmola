import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  @Input() readonly myProjects!: Project[];
  @Input() readonly selectedProject!: Project;
  @Input() readonly searchText: string;

  @Output() readonly selectProject = new EventEmitter<Project>();
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '@pages/projects/interfaces/interfaces';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  @Input() readonly myProjects!: Project[];
  @Input() readonly selectedProject!: Project;
  @Input() readonly searchText: string;

  @Output() readonly selectProjectEmitter = new EventEmitter<Project>();

  public selectProject(project: Project): void {
    this.selectProjectEmitter.emit(project);
  }
}
